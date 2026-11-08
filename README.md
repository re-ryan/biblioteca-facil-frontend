# Biblioteca Fácil

O Biblioteca Fácil é uma aplicação acadêmica em React para consulta e organização de livros. O projeto possui duas áreas: uma para o leitor pesquisar o catálogo e outra para o administrador cuidar dos livros da biblioteca.

## Escopo desta entrega

### Módulo Leitor

- pesquisa por título, autor e categoria;
- consulta das bibliotecas que possuem cada livro;
- exibição da quantidade disponível;
- acesso ao telefone, e-mail e endereço da biblioteca sem sair do catálogo.

### Módulo Biblioteca

- listagem e pesquisa de livros;
- cadastro e edição dos dados bibliográficos;
- exclusão lógica, ocultando o livro sem apagar o registro;
- consulta de informações de um livro pelo ISBN.

### Acesso

A autenticação é demonstrativa e mantida apenas enquanto a aplicação está aberta. Ela foi criada para apresentar as rotas privadas e a separação entre os dois perfis.

| Perfil | Login | Senha | Área inicial |
| --- | --- | --- | --- |
| Leitor | `leitor` | `leitura123` | Catálogo |
| Administrador | `bibliotecario-linux` | `biblioteca123` | Gerenciamento de livros |

### Fora do escopo

Esta entrega não inclui cadastro de contas, autenticação com token, empréstimos ou reservas. O foco é o CRUD de livros, a consulta do catálogo, o consumo de APIs e a navegação entre páginas.

## Tecnologias

- React e Vite;
- React Router;
- React Query;
- Material UI;
- Fetch API;
- Vitest e React Testing Library;
- ESLint.

O frontend utiliza a API do Biblioteca Fácil para o CRUD e para o catálogo. A consulta bibliográfica por ISBN chega à BrasilAPI por meio do serviço de consulta do backend.

## Como executar

### 1. Backend

O backend está no repositório [biblioteca-facil-microsservicos](https://github.com/re-ryan/biblioteca-facil-microsservicos).

Depois de clonar o repositório, crie o arquivo de configuração local e defina as senhas solicitadas:

```bash
cp .env.example .env
docker compose up --build -d
```

A API principal ficará disponível em `http://localhost:8080` e o serviço de consulta ISBN em `http://localhost:8081`.

### 2. Frontend

Este projeto requer Node.js 24 ou superior e npm 11 ou superior.

```bash
npm install
npm run dev
```

A aplicação ficará disponível em [http://localhost:5173](http://localhost:5173).

Durante o desenvolvimento, o Vite encaminha as chamadas locais para os serviços do backend. O catálogo apresenta somente livros associados a bibliotecas e acervos ativos no banco de dados.

## Verificações

```bash
npm run test
npm run lint
npm run build
```

Esses comandos executam os testes automatizados, verificam o padrão do código e geram a versão de produção.

## Repositório

Código-fonte do frontend: [biblioteca-facil-frontend](https://github.com/re-ryan/biblioteca-facil-frontend)
