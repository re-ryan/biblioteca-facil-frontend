# Biblioteca Fácil

Frontend em React para consulta e administração do catálogo do Biblioteca Fácil. A plataforma reúne livros cadastrados por bibliotecas parceiras e facilita a descoberta de exemplares pelos leitores.

## Tecnologias

- React
- Vite
- React Router
- TanStack Query
- Material UI
- Vitest e React Testing Library

## Requisitos

- Node.js 24 ou superior
- npm 11 ou superior
- API do Biblioteca Fácil executando em `http://localhost:8080`
- Serviço de consulta ISBN executando em `http://localhost:8081`

## Execução

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Verificações

```bash
npm run lint
npm run test
npm run build
```

Durante o desenvolvimento, o Vite encaminha as chamadas iniciadas por `/api` para a API principal e as chamadas iniciadas por `/isbn-api` para o serviço de consulta ISBN.
