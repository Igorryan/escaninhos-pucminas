<h3 align="center">
<img style="" width="200px" src="img/pucminaslogo.png">
</h3>

<h1 align="center">Plataforma dos Escaninhos</h1>
<p align="center">A plataforma dos escaninhos foi desenvolvida para auxiliar e otimizar o gerenciamento dos compartimentos disponibilizados aos alunos. Além de ter sido meu primeiro projeto publicado.</p>

<a target="_blank" href="https://youtu.be/omsPSC1DbAI"> View User Experience and Design on Youtube.</a><br>

### Implementação

Abaixo estão descritas as funcionalidades implementadas.

| Funcionalidades administrador | Propósito |
| ------ | ------ |
| Verificar inclusões | A cor do botão indica se há solicitações de inclusão pendentes, quando acionado, exibe as solicitações de inclusão. |
| Ativar renovação | Reinicia todos os relacionamentos entre compartimento e respectivo aluno, permitindo que o antigo proprietário efetive a renovação, garantindo o compartimento para o semestre vigente. Caso o aluno não renove, o compartimento é liberado. |
| Incluir aluno | Relaciona um aluno a um compartimento. |
| Pesquisar | Busca um compartimento, a partir de um número de matricula. |
| Solicitar | Posiciona um aluno na fila de espera. |
| Andar | Permite fazer um switch por andar (os compartimento são organizados fisicamente nos andares do prédio em que o curso ocorre). |
| Filtro por situação |▸ Todos: Exibe todos os compartimentos cadastrados; <br>▸ Liberados: Exibe compartimentos disponíveis; <br>▸ Ocupados: Exibe compartimentos ocupados; <br>▸ Renovar: Exibe compartimentos pendentes de renovação; <br>▸ Defeito: Exibe compartimentos com defeito(s). |
| Estátisticas | Apresenta a porcentagem do estado dos compartimentos, por situação (ocupados, à renovar, liberados e defeituosos). |
| Clique sobre compartimento|▸ Liberado: Permite alocar um aluno da lista de espera e mudar ou mudar a situação do compartimento para defeituoso; <br>▸ Ocupado: Permite desalocar o aluno proprietário definindo o compartimento como disponível;<br> ▸ Renovar: Permite a renovação de um compartimento específico; <br> ▸ Defeituoso: Permite alterar o estado para concertado, definindo o compartimento como disponível.|

| Funcionalidades aluno | Propósito |
| ------ | ------ |
| Solicitar | Envia uma solicitação para adquirir um compartimento. |
| Renovar | Renova o compartimento para uso no semestre vigente.|
| Trocar| Envia uma solicitação de troca. |
| Abandonar| Abandona o compartimento.|
| Exibir | Por padrão, o compartimento e sua localização no prédio é exibido caso o aluno possua um.|

### Tecnologias utilizadas

- HTML / CSS / JavaScript;
- Framework Material Design (template);
- Google Firebase;
- QR Code.

### Screenshots das telas

Interface do aluno <a target="_blank" href="https://youtu.be/omsPSC1DbAI"> View User Experience and Design on Youtube.</a><br>

<img src="img/2.png">

Plataforma do administrador <a target="_blank" href="https://youtu.be/omsPSC1DbAI"> View User Experience and Design on Youtube.</a><br>

<img src="img/4.png">

-------

<h6 align="center"><img width="390px" src="img/1.png"></h6>
<p align="center"><i>Estou à direita de Gustavo Verine, na época, auxiliar de infraestrutura e colega de trabalho, além de ter sido o principal cliente do projeto.</i></p>

<p align="center"><i>Era função dele verificar compartimento um a um, fazendo uma "varredura" afim de coletar o estado, a disponibilidade e a relação. E função do aluno, ir até a secretária para registrar, renovar, trocar e abandonar um compartimento.</i></p>