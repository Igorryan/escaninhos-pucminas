$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // ...
        } else {
            window.location.href = "../index.html";
            // User is signed out.
            // ...
        }
        // ...
    });

    /*inserindo andares*/
    //SUBSOLO

    var quant_SS = 48;
    var quant_2 = 80;
    var quant_3 = 96;
    var quant_4 = 104;
    quant_escaninhos = quant_SS + quant_2 + quant_3 + quant_4;
    escaninhosOcupados = 0;
    escaninhosRenovar = 0;
    escaninhosDefeito = 0;

    for (var i = 1; i <= quant_SS; i++) {
        $("#divAndarSS").append('<div onclick="editarEscaninho(this);" id="AS_' + i + '" class="animated flipInX escani escaninhoLiberado" style=" margin: 7px; padding: 0px; display: inline-block; width: 300px;" class="col-sm-3 col-md-3 col-xs-3 col-lg-3 card-header card-header-info"><div class="nav-tabs-navigation"><div style="padding: 0px;" class="nav-tabs-wrapper"><ul class="nav nav-tabs" data-tabs="tabs"><li style="margin-top: 10px;" class="nav-item"><a id="AS_' + i + 'escan" class="nav-link active show card-header-info" data-toggle="tab">' + i + '<div class="ripple-container"></div></a></li><li class="nav-item"><a class="cont nav-link" data-toggle="tab"><span class="nome" id="AS_' + i + 'nome">&nbsp</span><br><span id="AS_' + i + 'matricula" class="matricula">&nbsp</span> <span id="AS_' + i + 'status" style="float: right;"><span style="float: right;" class="badge badge-pill badge-info">LIBERADO</span></span><div class="ripple-container"></div></a></li></ul></div></div></div>');
    }
    //SEGUNDO ANDAR
    for (var i = 1; i <= quant_2; i++) {
        $("#divAndar2").append('<div onclick="editarEscaninho(this);" id="A2_' + i + '" class="animated flipInX escani escaninhoLiberado" style="margin: 7px; padding: 0px; display: inline-block; width: 300px;" class="col-sm-3 col-md-3 col-xs-3 col-lg-3 card-header card-header-info"><div class="nav-tabs-navigation"><div style="padding: 0px;" class="nav-tabs-wrapper"><ul class="nav nav-tabs" data-tabs="tabs"><li style="margin-top: 10px;" class="nav-item"><a id="A2_' + i + 'escan" class="nav-link active show card-header-info" data-toggle="tab">' + i + '<div class="ripple-container"></div></a></li><li class="nav-item"><a class="cont nav-link" data-toggle="tab"><span class="nome" id="A2_' + i + 'nome">&nbsp</span><br><span id="A2_' + i + 'matricula" class="matricula">&nbsp</span> <span id="A2_' + i + 'status" style="float: right;"><span style="float: right;" class="badge badge-pill badge-info">LIBERADO</span></span><div class="ripple-container"></div></a></li></ul></div></div></div>');
    }
    //TERCEIRO ANDAR
    for (var i = 1; i <= quant_3; i++) {
        $("#divAndar3").append('<div onclick="editarEscaninho(this);" id="A3_' + i + '" class="animated flipInX escani escaninhoLiberado" style="margin: 7px; padding: 0px; display: inline-block; width: 300px;" class="col-sm-3 col-md-3 col-xs-3 col-lg-3 card-header card-header-info"><div class="nav-tabs-navigation"><div style="padding: 0px;" class="nav-tabs-wrapper"><ul class="nav nav-tabs" data-tabs="tabs"><li style="margin-top: 10px;" class="nav-item"><a id="A3_' + i + 'escan" class="nav-link active show card-header-info" data-toggle="tab">' + i + '<div class="ripple-container"></div></a></li><li class="nav-item"><a class="cont nav-link" data-toggle="tab"><span class="nome" id="A3_' + i + 'nome">&nbsp</span><br><span id="A3_' + i + 'matricula" class="matricula">&nbsp</span> <span id="A3_' + i + 'status" style="float: right;"><span style="float: right;" class="badge badge-pill badge-info">LIBERADO</span></span><div class="ripple-container"></div></a></li></ul></div></div></div>');
    }
    //QUARTO ANDAR
    for (var i = 1; i <= quant_4; i++) {
        $("#divAndar4").append('<div onclick="editarEscaninho(this);" id="A4_' + i + '" class="animated flipInX escani escaninhoLiberado" style="margin: 7px; padding: 0px; display: inline-block; width: 300px;" class="col-sm-3 col-md-3 col-xs-3 col-lg-3 card-header card-header-info"><div class="nav-tabs-navigation"><div style="padding: 0px;" class="nav-tabs-wrapper"><ul class="nav nav-tabs" data-tabs="tabs"><li style="margin-top: 10px;" class="nav-item"><a id="A4_' + i + 'escan" class="nav-link active show card-header-info" data-toggle="tab">' + i + '<div class="ripple-container"></div></a></li><li class="nav-item"><a class="cont nav-link" data-toggle="tab"><span class="nome" id="A4_' + i + 'nome">&nbsp</span><br><span id="A4_' + i + 'matricula" class="matricula">&nbsp</span> <span id="A4_' + i + 'status" style="float: right;"><span style="float: right;" class="badge badge-pill badge-info">LIBERADO</span></span><div class="ripple-container"></div></a></li></ul></div></div></div>');
    }

    //preenchendo os escaninhos
    firebase.database().ref('/alunos/').once('value').then(function (snapshot) {
        var alunos = Object.values(snapshot.val());
        var quanAlunos = alunos.length;
        for (var i = 0; i < quanAlunos; i++) {
            var matricula = alunos[i].Matricula;
            var nome = alunos[i].Nome;
            var semestrePassadoEscaninho = alunos[i].semestrePassado;
            var semestreAtualEscaninho = alunos[i].semestreAtual;
            if (semestrePassadoEscaninho != -1 && semestreAtualEscaninho == -1) {
                //RENOVAR
                $("#" + semestrePassadoEscaninho).removeClass("escaninhoLiberado");
                $("#" + semestrePassadoEscaninho).addClass("escaninhoRenovar");
                $("#" + semestrePassadoEscaninho + "nome").html(nome);
                $("#" + semestrePassadoEscaninho + "matricula").html(matricula);
                $("#" + semestrePassadoEscaninho + "status").html('<span class="badge badge-pill badge-warning" style="float: right;">RENOVAR</span>');
                $("#" + semestrePassadoEscaninho + "escan").removeClass('card-header-info');
                $("#" + semestrePassadoEscaninho + "escan").addClass('card-header-warning');
                escaninhosRenovar++;
            } else if (semestreAtualEscaninho != -1) {
                //OCUPADO
                $("#" + semestreAtualEscaninho).removeClass("escaninhoLiberado");
                $("#" + semestreAtualEscaninho).addClass("escaninhoOcupado");
                $("#" + semestreAtualEscaninho + "nome").html(nome);
                $("#" + semestreAtualEscaninho + "matricula").html(matricula);
                $("#" + semestreAtualEscaninho + "status").html('<span class="badge badge-pill badge-success" style="float: right;">OCUPADO</span>');
                $("#" + semestreAtualEscaninho + "escan").removeClass('card-header-info');
                $("#" + semestreAtualEscaninho + "escan").addClass('card-header-success');
                escaninhosOcupados++;
            }
        }
    });

    firebase.database().ref('/escaninhos/danificados/').once('value').then(function (snapshot) {
        var escaninhosDanificados = Object.values(snapshot.val());
        for (var i = 0; i < escaninhosDanificados.length; i++) {
            $("#" + escaninhosDanificados[i].escaninho + "nome").html(escaninhosDanificados[i].problema);
            $("#" + escaninhosDanificados[i].escaninho + "status").html('<span class="badge badge-pill badge-danger" style="float: right;">DEFEITO</span>');
            $("#" + escaninhosDanificados[i].escaninho).removeClass('escaninhoLiberado');
            $("#" + escaninhosDanificados[i].escaninho).addClass('escaninhoDefeito');
            $("#" + escaninhosDanificados[i].escaninho + "escan").removeClass('card-header-info');
            $("#" + escaninhosDanificados[i].escaninho + "escan").addClass('card-header-danger');
            escaninhosDefeito++;
        }
    });

    firebase.database().ref('/pedidosPendentes/destravarEscaninho/').once('value').then(function (snapshot) {
        var lista = Object.values(snapshot.val());
        console.log(lista);
        for (var i = 0; i < lista.length; i++) {
            var escaninhoAndar = lista[i].escaninho;
            var andar = escaninhoAndar.slice(1, 2);
            var escaninho = escaninhoAndar.slice(3);
            switch (andar) {
                case "S":
                    andar = "SUBSOLO";
                    break;
                case "2":
                    andar = "2° andar";
                    break;
                case "3":
                    andar = "3° andar";
                    break;
                case "4":
                    andar = "4° andar";
                    break;
            }
            $("#listaEscaninhos").append('<tr id="btn' + lista[i].matricula + '"><td>' + andar + '</td><td>' + escaninho + '</td><td>' + lista[i].matricula + '</td><td><i onclick="desbloqueado(' + lista[i].matricula + ')" data-toggle="tooltip" data-placement="left" title="Escaninho foi desbloqueado"  class="material-icons" style="color: red; cursor: pointer;">lock</i></td></tr>');
        }
    });

    $("#pesqNomeInput").click(function () {
        $("#pesqMatriculaInput").val("");
    });
    $("#pesqMatriculaInput").click(function () {
        $("#pesqNomeInput").val("");
    });

    setTimeout(function () {
        var escaninhosLivres = quant_escaninhos - (escaninhosOcupados + escaninhosRenovar + escaninhosDefeito);
        var percentLivres = (escaninhosLivres * 100) / quant_escaninhos;
        var percentOcupados = (escaninhosOcupados * 100) / quant_escaninhos;
        var percentDefeito = (escaninhosDefeito * 100) / quant_escaninhos;
        var percentRenovar = (escaninhosRenovar * 100) / quant_escaninhos;
        $('#progressLivre').css('width', percentOcupados + "%");
        $('#progressRenovar').css('width', percentRenovar + "%");
        $('#progressOcupados').css('width', percentLivres + "%");
        $('#progressDefeito').css('width', percentDefeito + "%");
        $('#descriptionLivre').html("Ocupados: " + percentOcupados.toFixed(2) + "%");
        $('#descriptionRenovar').html("À renovar: " + percentRenovar.toFixed(2) + "%");
        $('#descriptionOcupado').html("Liberados: " + percentLivres.toFixed(2) + "%");
        $('#descriptionDefeito').html("Defeituosos: " + percentDefeito.toFixed(2) + "%");
    }, 4000);

    firebase.database().ref('/pedidosPendentes/solicitacao/').once('value').then(function (snapshot) {
        if (snapshot.val() != null) {
            $("#incluirButtonI").addClass('incluirNotificacao');
            $("#incluirButtonSpan").addClass('incluirNotificacao');
        } else {
            $("#incluirButtonI").removeClass('incluirNotificacao');
            $("#incluirButtonSpan").removeClass('incluirNotificacao');
        }

    }).catch(function () {

    });
});

function desbloqueado(matricula) {
    console.log(matricula);
    $("#btn" + matricula).hide(500);
    /*Enviar email ou/e mensagem com a senha nova*/
    firebase.database().ref('/pedidosPendentes/destravarEscaninho/' + matricula).remove().then(function () {
        console.log("Escaninho: " + matricula + " - DESBLOQUEADO");
    });
}

function sairAdmin() {
    firebase.auth().signOut().then(function () {
        console.log("Efetuando logout");
        window.location.href = "../index.html";
    }, function (error) {
        console.log("Não foi possivel efetuar logout, erro: " + error);
    });
}

function pesqAluno() {
    var nome = $("#pesqNomeInput").val();
    var matricula = $("#pesqMatriculaInput").val();
    var alunosMat;
    var alunosNome
    var alunos;
    var quantAlunos;
    var encontrou = 0;

    if (nome != "" || matricula != "") {
        firebase.database().ref('/alunos/').once('value').then(function (snapshot) {
            alunos = Object.values(snapshot.val());
            quantAlunos = alunos.length;
            if (nome != '') {
                for (var i = 0; i < quantAlunos; i++) {
                    if (nome == alunos[i].Nome) {
                        console.log("entramos aqui");
                        var escaninhoSA = alunos[i].semestreAtual;
                        var escaninhoSP = alunos[i].semestrePassado;
                        if (escaninhoSA != -1) {
                            $(".escani").hide();
                            $("#" + escaninhoSA).show();
                        } else if (escaninhoSP != -1) {
                            $(".escani").hide();
                            $("#" + escaninhoSP).show();
                        } else {
                            console.log("Aluno nunca teve escaninho")
                        }
                        $(function () {
                            $('#pesquisarAluno').modal('toggle');
                            $("#pesqMatriculaInput").val("");
                            $("#pesqNomeInput").val("");
                        });
                        return
                    }
                }
            } else {
                for (var i = 0; i < quantAlunos; i++) {
                    if (parseInt(matricula) == parseInt(alunos[i].Matricula)) {;
                        var escaninhoSA = alunos[i].semestreAtual;
                        var escaninhoSP = alunos[i].semestrePassado;
                        if (escaninhoSA != -1) {
                            $(".escani").hide();
                            $("#" + escaninhoSA).show();
                        } else if (escaninhoSP != -1) {
                            $(".escani").hide();
                            $("#" + escaninhoSP).show();
                        } else {
                            console.log("Aluno nunca teve escaninho");
                        }
                        $(function () {
                            $('#pesquisarAluno').modal('toggle');
                            $("#pesqMatriculaInput").val("");
                            $("#pesqNomeInput").val("");
                        });
                        return
                    }
                }
            }

        });
    } else {
        console.log("ESCREVE ALGO ARROMBADO")
    }
}

function mostrarAndares(andar) {
    switch (andar) {
        case 0:
            $('#spanAndar').html('ANDAR');
            $("#divAndarSS").show();
            $("#divAndar2").show();
            $("#divAndar3").show();
            $("#divAndar4").show();
            break;
        case 1:
            andarToggle("divAndarSS", "divAndar2", "divAndar3", "divAndar4");
            $('#spanAndar').html('SUBSOLO');
            break;
        case 2:
            andarToggle("divAndar2", "divAndarSS", "divAndar3", "divAndar4");
            $('#spanAndar').html('2° ANDAR');
            break;
        case 3:
            andarToggle("divAndar3", "divAndarSS", "divAndar2", "divAndar4");
            $('#spanAndar').html('3° ANDAR');
            break;
        case 4:
            andarToggle("divAndar4", "divAndarSS", "divAndar2", "divAndar3");
            $('#spanAndar').html('4° ANDAR');
            break;
    }
}


function andarToggle(mostra, esconde1, esconde2, esconde3) {
    $("#" + mostra).show();
    $("#" + esconde1).hide();
    $("#" + esconde2).hide();
    $("#" + esconde3).hide();
}

function filtrarStatus(status) {
    switch (status) {
        case 1:
            $("td", $(".escaninhoLiberado").show());
            $("td", $(".escaninhoOcupado").show());
            $("td", $(".escaninhoRenovar").show());
            $("td", $(".escaninhoDefeito").show());

            break;
        case 2:
            $("td", $(".escaninhoLiberado").show());
            $("td", $(".escaninhoOcupado").hide());
            $("td", $(".escaninhoRenovar").hide());
            $("td", $(".escaninhoDefeito").hide());
            break;
        case 3:
            $("td", $(".escaninhoOcupado").show());
            $("td", $(".escaninhoLiberado").hide());
            $("td", $(".escaninhoRenovar").hide());
            $("td", $(".escaninhoDefeito").hide());

            break;
        case 4:
            $("td", $(".escaninhoRenovar").show());
            $("td", $(".escaninhoOcupado").hide());
            $("td", $(".escaninhoLiberado").hide());
            $("td", $(".escaninhoDefeito").hide());

            break;
        case 5:
            $("td", $(".escaninhoDefeito").show());
            $("td", $(".escaninhoRenovar").hide());
            $("td", $(".escaninhoOcupado").hide());
            $("td", $(".escaninhoLiberado").hide());
            break;
    }
}

function editarEscaninho(escaninho) {
    if ($("#" + escaninho.id).hasClass('escaninhoLiberado')) {
        $("#nEscaninho").html('Incluir aluno no escaninho ou relatar defeito:');
        $("#bodyModalEditar").html('<div id="escanDesc" style="display: none;"><div  style="margin: 0px; padding: 0px;"  class="form-group has-default bmd-form-group"><input id="descricaoInput" type="text" class="form-control" placeholder="Descrição do problema"></div></div><select name="aluno" id="alunoEsc"><option value="">Selecione o aluno</option></select><br><br><div class="togglebutton"><label><input id="danificadoCheckBox" type="checkbox"><span onclick="mostrarDanificado();" class="toggle"></span></label>Escaninho danificado</div>');
        $("#footerModalEditar").html('<button style="display:none;" id="danificadoBtn" onclick="danificado(' + escaninho.id + ');" class="btn btn-danger">Danificado<div class="ripple-container"></div></button><button type="button" id="cancelBtn" class="btn btn-danger btn-link" data-dismiss="modal">cancelar<div class="ripple-container"><div class="ripple-decorator ripple-on ripple-out" style="left: 49.5518px; top: 15.5264px; background-color: rgb(244, 67, 54); transform: scale(8.50976);"></div></div></button><button onclick="incluirAlunoEscaninho();" id="incluirBtn" type="button" class="btn btn-success btn-link ">INCLUIR</button>')
        $("#alunoEsc").html("<option value='0'>Selecione o aluno</option>");
        firebase.database().ref('/pedidosPendentes/solicitacao').once('value').then(function (snapshot) {
            var alunosSelecionados = Object.values(snapshot.val());
            var quantAlunos = alunosSelecionados.length;
            alunosSelecionados.sort(function (a, b) {
                return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
            });
            for (var i = 0; i < alunosSelecionados.length; i++) {
                console.log(alunosSelecionados);
                $("#alunoEsc").append("<option name='" + alunosSelecionados[i].nome + "' value='" + alunosSelecionados[i].matricula + "." + escaninho.id + "'>" + alunosSelecionados[i].matricula + " - " + alunosSelecionados[i].nome + "</option>");
            }
            $("#editarEscaninho").modal('show');
        }).catch(function () {
            $("#editarEscaninho").modal('show');
        });
    } else if ($("#" + escaninho.id).hasClass('escaninhoOcupado')) {

        $("#nEscaninho").html('Desocupar escaninho:');
        $("#bodyModalEditar").html('<button onclick="excluirAlunoEscaninho(' + escaninho.id + ');" style="width: 100%;" class="btn btn-danger">EXCLUIR<div class="ripple-container"></div></button>');
        $("#footerModalEditar").html('<button type="button" class="btn btn-danger btn-link" data-dismiss="modal">cancelar<div class="ripple-container"><div class="ripple-decorator ripple-on ripple-out" style="left: 49.5518px; top: 15.5264px; background-color: rgb(244, 67, 54); transform: scale(8.50976);"></div></div></button>');
        $("#editarEscaninho").modal('show');
    } else if ($("#" + escaninho.id).hasClass('escaninhoRenovar')) {
        $("#nEscaninho").html('Ronovar ou desocupar escaninho:');
        $("#bodyModalEditar").html('<button onclick="renovarAlunoEscaninho(' + escaninho.id + ')" style="width: 100%;" class="btn btn-warning">RENOVAR<div class="ripple-container"></div></button><button style="width: 100%;" onclick="excluirAlunoEscaninho(' + escaninho.id + ');" class="btn btn-danger">EXCLUIR<div class="ripple-container"></div></button>');
        $("#footerModalEditar").html('<button type="button" class="btn btn-danger btn-link" data-dismiss="modal">cancelar<div class="ripple-container"><div class="ripple-decorator ripple-on ripple-out" style="left: 49.5518px; top: 15.5264px; background-color: rgb(244, 67, 54); transform: scale(8.50976);"></div></div></button>');
        $("#editarEscaninho").modal('show');
    } else if ($("#" + escaninho.id).hasClass('escaninhoDefeito')) {
        $("#nEscaninho").html("Escaninho com defeito:");
        $("#bodyModalEditar").html('<button onclick="deletarDefeito(' + escaninho.id + ')" class="btn btn-success">ESCANINHO CONCERTADO</button>');
        $("#editarEscaninho").modal('show');
        $("#footerModalEditar").html('');
    }
}

function modoRenovação() {

    var data = $("#dataRenovar").val();
    var hoje = new Date();
    var dataLimite = new Date(data);
    var ano = dataLimite.getFullYear();
    var mes = dataLimite.getMonth() + 1;
    var dia = dataLimite.getDate() + 1;
    var datacompleta = ano + "-" + mes + "-" + dia;
    if (dataLimite < hoje) {
        alert("A data limite para renovação precisa ser maior que a data atual");
    } else {
        firebase.database().ref('/alunos/').once('value').then(function (snapshot) {
            vetorAlunos = Object.values(snapshot.val());
            for (var i = 0; i < vetorAlunos.length; i++) {
                var matricula = vetorAlunos[i].Matricula;
                var antigo = vetorAlunos[i].semestreAtual;
                firebase.database().ref('/alunos/' + matricula).update({
                    semestrePassado: antigo,
                    semestreAtual: -1
                }).then(function () {
                    console.log("Ok");
                });
            }

        });
        firebase.database().ref('/escaninhos/datalimite/').update({
            data: datacompleta
        }).then(function () {
            alert("Alunos em modo de renovação! com data limite para o dia: " + dia + "/" + mes);
            window.location.reload();
        });
    }
}

function mudarDataLimite() {
    var data = $("#dataRenovar").val();
    var hoje = new Date();
    var dataLimite = new Date(data);
    var ano = dataLimite.getFullYear();
    var mes = dataLimite.getMonth() + 1;
    var dia = dataLimite.getDate() + 1;
    var datacompleta = ano + "-" + mes + "-" + dia;
    if (dataLimite < hoje) {
        alert("A data limite para renovação precisa ser maior que a data atual");
    } else {
        firebase.database().ref('/escaninhos/datalimite/').update({
            data: datacompleta,
            modoRenovacao: true
        }).then(function () {
            alert("Data limite renovada para o dia: " + dia + "/" + mes);
        });
    }
}

function incluirAlunoNoSistema() {
    $("#matriculaAlunoNovo").focus();
    var nome = $("#nomeAlunoNovo").val();
    var matricula = $("#matriculaAlunoNovo").val();
    if (nome != null && matricula != null) {
        firebase.database().ref('/alunos/' + matricula).set({
            Nome: nome,
            Matricula: parseInt(matricula),
            semestreAtual: -1,
            semestrePassado: -1
        }).then(function () {
            alert("Aluno registrado!");
            window.location.reload();
        }).catch(function(){
            alert("Erro ao registrar aluno!");
        });
    }
}

function renovarAlunoEscaninho(escaninho) {
    var id = escaninho.id;
    var matricula = id + "matricula";
    var matricula = $("#" + matricula).html();
    var escaninho;
    var andar;
    firebase.database().ref('/alunos/' + matricula).once('value').then(function (snapshot) {
        escaninho = snapshot.val().semestrePassado;
        if (escaninho != -1) {
            firebase.database().ref('/alunos/' + matricula).update({
                semestreAtual: escaninho
            }).then(function () {
                console.log("Escaninho renovado");
                window.location.reload();
            });
        }
    });
}


function excluirAlunoEscaninho(escaninho) {

    var id = escaninho.id;
    var matricula = id + "matricula";
    var matricula = $("#" + matricula).html();
    if (window.confirm('Tem certeza que deseja desalocar o aluno deste escaninho?')) {
        firebase.database().ref('/alunos/' + matricula).update({
            semestreAtual: -1
        }).then(function () {
            console.log("Semestre atual deletado");
        });
        firebase.database().ref('/alunos/' + matricula).update({
            semestrePassado: -1
        }).then(function () {
            console.log("Semestre passado deletado");
        });
        window.location.reload();
    }
}


function incluirAlunoEscaninho() {
    var aluno_escaninho = $("#alunoEsc").val();
    var nome = $('#alunoEsc').find(":selected").text();
    var matricula = aluno_escaninho.slice(0, 6);
    var escaninho = aluno_escaninho.slice(7);
    firebase.database().ref('/alunos/' + matricula).update({
        semestreAtual: escaninho
    }).then(function () {
        console.log("Aluno: " + nome + " incluso no escaninho: " + escaninho);
        firebase.database().ref('/pedidosPendentes/solicitacao/' + matricula).remove();

        $('#editarEscaninho').modal('hide');
        window.location.reload();

    }).catch(function () {
        console.log("Não foi possivel inserir o aluno");
    });
}

function mostrarDanificado() {
    $("#alunoEsc").toggle(300);
    $("#escanDesc").toggle(300);
    $("#danificadoBtn").toggle(300);
    $("#cancelBtn").toggle(300);
    $("#incluirBtn").toggle(300);
}

function solicitarEscaninhoAluno() {
    var matricula = $("#matricula_incluir").val();
    console.log(matricula);
    firebase.database().ref('/alunos/' + matricula).once('value').then(function (snapshot) {
        firebase.database().ref('/pedidosPendentes/solicitacao/' + matricula).set({
            matricula: matricula,
            nome: snapshot.val().Nome
        });
        window.location.reload();
    }).catch(function () {
        alert('Matricula não encontrada, favor verificar se aluno(a) está matriculado ou forneceu a matrícula correta!');
    });
}

function danificado(escaninho) {
    var descricao = $("#descricaoInput").val();
    descricao.toUpperCase();
    firebase.database().ref('/escaninhos/danificados/' + escaninho.id).set({
        escaninho: escaninho.id,
        problema: descricao
    }).then(function () {
        alert("Defeito registrado!");
        window.location.reload();
    });
}

function deletarDefeito(escaninho) {
    firebase.database().ref('/escaninhos/danificados/' + escaninho.id).set({

    }).then(function () {
        alert('Defeito deletado');
        window.location.reload();
    });
}
