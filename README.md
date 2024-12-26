Este projeto tem como objetivo testar alguns conhecimentos utilizando o framework Angular para desenvolvimento de aplicacoes modernas.

Conceitos abordados: 
    - Componentes 
    - Servicos 
    - Pipes
    - Roteamento
    - Guardas de Rotas
    - Formularios
    - Observables

- Servicos: Foi utilizado para captura de dados via API. Utilizado tambem para a simulacao de um sistema de autenticacao.

- Pipes: Foi utilizado para geracao de filtros em algumas listagens do projeto.

- Roteamento: Foi utilizado para criar e gerenciar as rotas da aplicacao

- Guarda de Rotas: Foi utilizado para assegurar a utilizacao de algumas rotas apenas se tiver autenticado (simulacao). 

- Formularios: foi utilizado formularios reativos tanto para inputs de de filtros como para formulario de login no sistema.

- Foi utilizado os conceitos de Observables para a captura de dados via api. Tambem utilizado Subjects para a limpeza de subscricoes apos a destruicao do componente.

- Foi utilizado tambem tipagens do Typescript.


* Estrutura do projeto: 

Componentes: 
    - Login (login): este componente acessado pela rota /login nele e informado usuario e senha onde o servico [AuthService] ira simular uma requisicao http e a devolucao de um token, este token e armazenado no localStorage e posteriormente o guard ira verificar se o cliente esta com o token.
    - Cabecalho (cabecalho): este componente fixo contem a logo do projeto e informacoes do usuario (username).
    - Sidebar (sidebar): este componente fixo possui os menus disponiveis na aplicacao para acessar as rotas.
    - Dashboard: este componente contem a listagem de todos os cards que ira mostrar cada personagem e barra de pesquisa com filtros. O mesmo e renderizado na rota /characters.
        - Ao rolar o scroll o componente carrega por paginacao via api os demais personagens.
        - Cada personagem e representado pelo componente: [card-person] onde apos o servico [characters-service] buscar os dados via API sobre os personagens, estes dados sao passados via @Input para o componente [card-person].
    
        - Na barra de pesquisa ao comecar a digitar o nome de um personagem, oque foi listado ate o momento e filtrado atraves de um Pipe [filterPerson]. Tambem ao rolar o scroll da pagina os filtros dos personagens sao adicionados conforme vai carregando outros personagens, existe tambem alguns outros filtros como status, sexo e especie.
        - Estes outros filtros tambem possui pipes que ao ser selecionado a listagem e filtrada.
        - Ao preencher os filtros e clicar no botao de pesquisar o sistema utiliza o servico [characters-service] para buscar com filtros via API.
        - Ao abrir um card de personagem e mostrado todas as informacoes do mesmo atraves de um modal e juntos das informacoes do personagem e mostrado tambem os episodios em que o personagem esta presente.
        - Ao clicar no link do episodio ira mostrar um modal contendo as informacoes do episodio.

    - Episodios: este componente contem a listagem dos episodios e esta presente na rota /episodes
        - Ao rolar ao scroll e realizado as requisicoes para a paginacao.
        - Os cards possuem funcionamento semelhante, as informacoes sao abertas em um modal ao ser clicado no card . As informacoes dos personagens tambem aparece ao clicar em cada personagem que e listado no card de episodio.

- Logout do sistema: Ao ser clicado na sidebar, e destruido o objeto do localStorage e redirecionado para a pagina de login.

