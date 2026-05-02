# Gestao Orcamento API

API REST em JavaScript para gestao de orcamento, estruturada em camadas e preparada para autenticacao JWT, MongoDB, documentacao Swagger, GitHub Actions e deploy via Vercel.

## Stack

- Node.js
- Express
- MongoDB com Mongoose
- JWT com jsonwebtoken
- Swagger UI
- Nodemon para desenvolvimento

## Estrutura

```text
src/
  app.js
  server.js
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
swagger/
  openapi.yaml
```

## Configuracao

Crie um arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Variaveis principais:

- `PORT`: porta da API.
- `BASE_URL`: URL base da aplicacao.
- `MONGO_URI`: string de conexao do MongoDB. Para MongoDB local/Compass, use `mongodb://127.0.0.1:27017/gestao_orcamento`.
- `JWT_SECRET`: segredo usado para assinar tokens JWT.
- `JWT_EXPIRES_IN`: tempo de expiracao do token.
- `CORS_ORIGIN`: origem permitida para CORS.

## Instalar dependencias

```bash
npm install
```

## Scripts

Inicio estatico:

```bash
npm start
```

Inicio com reinicio automatico em alteracoes:

```bash
npm run dev
```

## Endpoints iniciais

- `GET /health`: verifica se a API esta online.
- `POST /api/auth/register`: cria usuario.
- `POST /api/auth/login`: autentica usuario e retorna JWT.
- `GET /api/auth/me`: retorna dados do usuario autenticado.
- `GET /api-docs`: renderiza a documentacao Swagger.
- `GET /swagger/openapi.yaml`: expoe o arquivo de especificacao OpenAPI.

## Autenticacao

Envie o token JWT no header:

```http
Authorization: Bearer <token>
```

## Deploy

O arquivo `vercel.json` deixa a aplicacao pronta para deploy via Vercel. As variaveis de ambiente devem ser configuradas no painel da Vercel.
