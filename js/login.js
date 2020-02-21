   var cpf = $("#cpf");
   var matricula = $("#matricula");
   var database = firebase.database();
   senhaAdministrador = 123456789;
   semestrePassado = -1;
   semestreAtual = -1;
   nome_aluno = "";

   $(document).ready(function () {
       matricula.focus();

       matricula.keyup(function (e) {
           var valor = matricula.val();
           if (valor.length == 6) {
               cpf.focus();
           }
       });

       $("#renovarBtn").click(function () {
           var escaninho = semestrePassado;
           database.ref('/alunos/' + matricula.val()).update({
               semestreAtual: escaninho
           });
           alert("Escaninho renovado!");
           window.location.reload();
       });

       $("#solicitarBtn").click(function () {
           var andar = $("input[name='andar']:checked").val();
           var now = new Date;
           var ano = now.getFullYear();
           var dia = now.getDate();
           var mes = now.getMonth() + 1;
           firebase.database().ref('/pedidosPendentes/solicitacao/' + matricula.val()).set({
               matricula: matricula.val(),
               nome: nome_aluno,
               dia: dia,
               mes: mes,
               ano: ano
           });
           alert("Escaninho solicitado. Aguarde aprovação.")
           console.log("Escaninho solicitado");
           window.location.reload();
       });

       matricula.keyup(function (e) {
           var mat = matricula.val();
           if (mat.length == 6) {
               console.log("Procurando numero de matricula");
               database.ref('/alunos/' + mat).once('value').then(function (snapshot) {
                   //Encontrou a matricula do aluno
                   nome_aluno = snapshot.val().Nome;
                   var aluno = snapshot.val();
                   semestreAtual = aluno.semestreAtual;
                   semestrePassado = aluno.semestrePassado;
                   console.log(aluno);
                   $("#matriculaCamp").hide(300);
                   $("#cardLogin").css("height", "400");
                   if (aluno.semestreAtual != -1) {
                       var andar = aluno.semestreAtual.substring(0, 2);
                       var escaninho = aluno.semestreAtual.substring(3);
                       switch (andar) {
                           case "AS":
                               andar = "Subsolo"
                               break;
                           case "A2":
                               andar = "2° Andar"
                               break;
                           case "A3":
                               andar = "3° Andar"
                               break;
                           case "A4":
                               andar = "4° Andar"
                               break;
                       }
                       $(".description").html('Escaninho <span style="font-weight: 800; color: darkslategray;">n°: ' + escaninho + ' do ' + andar + '</span> - Aluno(a): <span style="font-weight: 800; color: darkslategray;">' + aluno.Nome + "</span>.");
                       $("#cardLogin").css("height", "200");
                       //analisar se compensa pedir desbloqueio por aqui
                   } else if (aluno.semestrePassado != -1) {
                       var andar = aluno.semestrePassado.substring(0, 2);
                       switch (andar) {
                           case "AS":
                               andar = "Subsolo"
                               break;
                           case "A2":
                               andar = "2° Andar"
                               break;
                           case "A3":
                               andar = "3° Andar"
                               break;
                           case "A4":
                               andar = "4° Andar"
                               break;
                       }
                       var escaninho = aluno.semestrePassado.substring(3);
                       $(".description").html('Olá <span style="font-weight: 800; color: darkslategray;">' + aluno.Nome + '</span>, se desejar utilizar o escaninho: <span style="font-weight: 800; color: darkslategray;">n°' + escaninho + ' do ' + andar + '</span> durante este semestre letivo, gentileza renová-lo.');
                       $("#solicitar").hide(300);
                       $("#opcoes_escaninhos").show(1000);
                       //aluno com escaninho pra renovar
                   } else {
                       database.ref('pedidosPendentes/solicitacao/' + mat).once('value').then(function (snapshot) {
                           if (snapshot.val() != null) {
                               $("#cardLogin").css("height", "200");
                               $(".description").html('Olá <span style="font-weight: 800; color: darkslategray;">' + aluno.Nome + '</span>, estamos processando seu pedido de escaninho!');
                           } else {
                               $(".description").html('Olá <span style="font-weight: 800; color: darkslategray;">' + aluno.Nome + '</span>, você ainda não possui um escaninho, solicite um e aguarde um e-mail de confirmação ou acesse este site novamente para verificar se já foi liberado.');
                               $("#renovar").hide(300);
                               $("#opcoes_escaninhos").show(1000);
                           }
                       });

                       //aluno sem escaninho
                   }

               }).catch(function () {
                   //Não encontrou a matricula do aluno
                   alert("Caro aluno(a), não encontramos seu nímero de matricula no sistema. Verifique se sua matrícula é: " + mat + ". Se o problema persistir, gentileza procurar a secretaria do curso!");
               });
           }
           var valor = matricula.val();
           if (valor == "admin") {
               console.log("Mudar para login de administrador");
               $("#cardLogin").hide(300);
               $("#headerEscaninhos").html('<input style="text-align: center;" type="password" id="passwordAdmin" class="form-control" placeholder="senha do administrador"><a style="cursor: pointer;" id="loginAdmin" onclick="entrarAdmin();" class="btn btn-primary btn-link btn-wd btn-lg">Entrar<div class="ripple-container"></div></a>')
           }
           $("#passwordAdmin").focus();
           $("#passwordAdmin").on('keyup', function (e) {
               if (e.keyCode == 13) {
                   entrarAdmin();
               }
               if ($("#passwordAdmin").val() == senhaAdministrador) {
                   entrarAdmin();
               }
           });
       });

       cpf.keyup(function (e) {
           var valor = cpf.val();
           console.log(e.keyCode);
           if (e.keyCode == 13) {
               entrar();
           }
           if (valor.length == 11 && matricula.val().length == 6) {
               $("#loginBtn").css('color', 'darkviolet');

           } else
               $("#loginBtn").css('color', 'rgba(0,0,0,.4)');
       });

   });

   function entrarAdmin() {
       if ($("#passwordAdmin").val() == senhaAdministrador) {
           firebase.auth().signInAnonymously().then(function () {
               firebase.auth().onAuthStateChanged(function (user) {
                   if (user) {
                       // User is signed in.
                       var isAnonymous = user.isAnonymous;
                       var uid = user.uid;
                       user.updateProfile({
                           displayName: "Gustavo"
                       });
                       console.log("Administrador Logado");
                       console.log(user.displayName);
                       window.location.href = 'examples/admin.html';
                       // ...
                   } else {
                       console.log("Administrador Deslogado");
                       window.location.href = '/public/index.html';
                   }
                   // ...
               });
           }).catch(function (error) {
               console.log("Não foi possivel logar");
               // Handle Errors here.
               var errorCode = error.code;
               var errorMessage = error.message;
               // ...
           });
       }
   }
