matricula = 1;
email = "";
nome = "";
semestrePassado = "";
semestreAtual = "";
pedidoDestravar = false;

$(document).ready(function () {
    
     
    
  setTimeout(function(){
          firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log("Usuario logado: "+user.displayName);
      
  } else {
      window.location.href = "../index.html";
  }
  // ...
});
  },1000);

    
    firebase.database().ref('/pedidosPendentes/destravarEscaninho/').once('value').then(function (snapshot) {
        var destravar = Object.values(snapshot.val());
        console.log(destravar);
        for (var i = 0; i < destravar.length; i++) {
            if (destravar[i].matricula == matricula) {
                pedidoDestravar = true;
                break;
            }
        }

    });



    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            matricula = user.displayName;
            firebase.database().ref('/alunos/' + matricula).once('value').then(function (snapshot) {

                if (snapshot.val() == null){
                    alert(matricula);
                    window.location.href = '../index.html';
                }

                nome = snapshot.val().Nome;
                email = snapshot.val().Email;
                $("#emailAluno").text(email);
                semestrePassado = snapshot.val().semestrePassado;
                semestreAtual = snapshot.val().semestreAtual;
                if (semestreAtual != -1) {
                    andar = semestreAtual.substring(0, 2);
                    escaninho = semestreAtual.substring(3);


                    switch (andar) {
                        case "AS":
                            andar = "Subsolo";
                            break;
                        case "A2":
                            andar = "2° andar";
                            break;
                        case "A3":
                            andar = "3° andar";
                            break;
                        case "A4":
                            andar = "4° andar";
                            break;
                    }
                }
                $("#nomeAluno").html(nome);
                email = snapshot.val().Email;
                if (semestreAtual != -1 && pedidoDestravar == false) {
                    $("#divDesbloqueio").show();
                    $("#divCarregando").hide();
                    
                }
                if (semestreAtual == -1) {
                    //NAO TEM ESCANINHO ESSE SEMESTRE

                    if (semestrePassado == -1) {

                        //VERIFICANDO SE EXISTE SOLICITACAO
                        firebase.database().ref('/pedidosPendentes/solicitacao/' + matricula).once('value').then(function (snapshot) {
                            if (snapshot.val() != null) {
                                $("#escaninhoAviso").html("Aguardando pedido de escaninho");
                                $("#escaninhoAviso").addClass("aviso");
                                $("#textoInformativo").html("Caro (a) aluno (a), ainda não temos um posicionamento para você em relação ao seu escaninho.");
                            } else {
                                //NÃO TEM ESCANINHO SEMESTRE PASSADO
                                $("#solicitar").show();
                                $("#escaninhoAviso").html("Central de Escaninhos:<br>Você ainda não possui escaninho.");
                                $("#escaninhoAviso").addClass("aviso");
                            }
                        }).catch(function () {

                        });

                    } else {
                        var dataLimite;
                        firebase.database().ref('/escaninhos/datalimite/').once('value').then(function(snapshot){
                            dataLimite = snapshot.val().data;
                            var data = new Date(dataLimite);
                            var dia = data.getDate()+1 ;
                            var mes = data.getMonth()+1;
                            var hoje = new Date();
                            console.log(data);
                            console.log(hoje);
                            if(data >= hoje && modoRenovacao == true){
                                 $("#escaninhoAviso").html("Prezado aluno (a),<br> Renove o escaninho: " + escaninho + " do " + andar + " até o dia "+dia+"/"+mes+"<br><span style='font-size: 12px; font-style: italic;'>Após a data, o escaninho será esvaziado e liberado.</span>");
                            }else{
                                firebase.database().ref('/pedidosPendentes/solicitacao/' + matricula).once('value').then(function (snapshot) {
                                    if (snapshot.val() != null) {
                                $("#escaninhoAviso").html("Aguardando pedido de escaninho");
                                $("#escaninhoAviso").addClass("aviso");
                                $("#cumprimentos").html("Caro (a) aluno (a), ainda não temos um posicionamento para você em relação ao seu escaninho.");
                                        $("#abandonar").hide();
                            } else {
                                 $("#escaninhoAviso").html("A prazo para renovar o escaninho se encerrou, solicite um novo escaninho.");
                                $("#solicitar").show();
                                
                            }
                                });
                          
                            }
                           
                        });
                        andar = semestrePassado.substring(0, 2);
                        escaninho = semestrePassado.substring(3);

                        
                        switch (andar) {
                            case "AS":
                                andar = "Subsolo";
                                break;
                            case "A2":
                                andar = "2° andar";
                                break;
                            case "A3":
                                andar = "3° andar";
                                break;
                            case "A4":
                                andar = "4° andar";
                                break;
                        }
                        //RENOVAR
                        firebase.database().ref('/escaninhos/datalimite/').once('value').then(function(snapshot){
                           modoRenovacao = snapshot.val().modoRenovacao;
                            if(modoRenovacao == true){
                                 $("#renovar").show();
                                 $("#renovarBtn").html("RENOVAR ESCANINHO: " + escaninho + " do " + andar);
                            }
                        });
                       
                        $("#abandonar").show();
                        
                       
                        $("#escaninhoAviso").addClass("aviso");
                    }
                } else {
                    //TEM ESCANINHO NO SEMESTRE ATUAL
                    firebase.database().ref('/pedidosPendentes/troca/' + matricula).once('value').then(function (snapshot) {
                        if (snapshot.val() != null) {

                            $("#escaninhoAviso").html("Escaninho:<br> n°  " + escaninho + " do " + andar + "<br><span style='font-size: 12px; font-style: italic;'>Existe um pedido de troca pendente para o " + snapshot.val().andarDestino + "</span>");
                        } else {
                            $("#escaninhoAviso").html("Escaninho:<br> n°  " + escaninho + " do " + andar);
                        }

                    });
                    $("#abandonar").show("opcaoAtiva");
                    $("#escaninhoAviso").addClass("infoEscaninho");
                }
            });
        } else {
            window.location.href = "../index.html";
        }
        
        
    });

    $("#abandonarBtn").click(function () {
        var abandonar = window.confirm("Após abandonar o escaninho não será possivel retomar a ação.");
        if (abandonar) {
            firebase.database().ref('/alunos/' + matricula).set({
                semestreAtual: -1
            });
            firebase.database().ref('/alunos/' + matricula).set({
                semestrePassado: -1
            });
            firebase.database().ref('/pedidosPendentes/solicitacao/' + matricula).remove();
            firebase.database().ref('/pedidosPendentes/troca/' + matricula).remove();

            console.log("Escaninho removido");
            window.location.reload();
        }
    });

    $("#logout").click(function () {
        firebase.auth().signOut().then(function () {
            console.log("Efetuando logout");
            window.location.href = "../index.html";
        }, function (error) {
            console.log("Não foi possivel efetuar logout, erro: " + error);
        });
    });

    $("#destravar").click(function () {
        console.log("Clicando");
        firebase.database().ref('/pedidosPendentes/destravarEscaninho/' + matricula).set({
            matricula: matricula,
            nome: nome,
            escaninho: semestreAtual
        });
        alert("Solicitação para destravar enviada. Aguarde!");
        window.location.reload();
    });

    $("#solicitarBtn").click(function () {
        var andar = $("input[name='andar']:checked").val();
        firebase.database().ref('/pedidosPendentes/solicitacao/' + matricula).set({
            matricula: matricula,
            nome: nome,
            andar: andar
        });
        alert("Escaninho solicitado. Aguarde aprovação.")
        console.log("Escaninho solicitado");
        window.location.reload();
    });
    $("#renovarBtn").click(function () {
        var escaninho = semestrePassado;
        firebase.database().ref('/alunos/' + matricula).update({
            semestreAtual: escaninho
        });
        alert("Escaninho renovado!");
        window.location.reload();
    });
    $("#trocarBtn").click(function () {
        var now = new Date();
        var dia = now.getDate();
        var mes = now.getMonth() + 1;
        var data = dia + "/" + mes;
        var hora = now.getHours();
        var minutos = now.getMinutes();
        var horario = hora + ":" + minutos;
        var andar = $("input[name='andar_troca']:checked").val();
        var motivo = $("#motivo_troca").val();
        firebase.database().ref('pedidosPendentes/troca/' + matricula).set({
            andarDestino: andar,
            motivo: motivo,
            data: data,
            hora: hora
        });
        alert('Troca solicitada, aguarde posicionamento.');
        window.location.reload();
    });
});
