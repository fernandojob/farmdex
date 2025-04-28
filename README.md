# FarmDex API

Este repositório contém a API FarmDex, desenvolvida com NestJS, utilizando Drizzle ORM para integração com PostgreSQL, e totalmente containerizada com Docker e Docker Compose.

O projeto aplica boas práticas como:

- Injeção de Dependência e Inversão de Controle

- Repository Pattern (no módulo de clientes)

- Decorators Personalizados

- Arquitetura Modular

- DRY Principle (Don't Repeat Yourself)

- Testes Unitários (com foco no fluxo de criação e validação de clientes)

- Swagger/OpenAPI para documentação de rotas (com decorators personalizados para manter os controllers limpos)

- Conexão assíncrona ao banco de dados via Drizzle

- Arquitetura pensada para escalabilidade

> **Documentação e testes de rotas** já estão disponíveis via Swagger UI em: [`http://localhost:3001/docs`](http://localhost:3001/docs)

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Docker
- Docker Compose

---

## 🚀 Como rodar a aplicação com Docker

**1. Clone o repositório**

```bash
git clone <URL_DO_REPOSITORIO>
cd farmdex
```

**2. Configure seu arquivo `.env`**  
Crie ou atualize o arquivo `.env` na raiz do projeto com as variáveis abaixo:

```ini
DATABASE_URL=postgres://postgres:admin@db:5432/farmdex
JWT_SECRET=minha-chave-secreta
```

> ⚠️ **Importante:** use `db` como host para conexão ao PostgreSQL dentro do Docker.

**3. Inicie os containers**

```bash
docker-compose up --build -d
```

- `--build`: recompila a imagem com as últimas alterações
- `-d`: executa em modo _detached_ (segundo plano)

**4. Execute as migrações**

```bash
docker-compose exec nest-app node dist/src/database/migrate.js
```

Isso criará as tabelas no banco PostgreSQL.

**5. Acesse a API**

- Swagger UI: [`http://localhost:3001/docs`](http://localhost:3001/docs)
- Health check: [`http://localhost:3001/`](http://localhost:3001/)

---

## 🛠️ Comandos úteis

**Parar e remover containers**

```bash
docker-compose down
```

**Rebuildar a aplicação** (após alterações no código)

```bash
docker-compose up --build -d
```

**Ver logs em tempo real**

```bash
docker logs nest-app --follow
```

**Acessar shell do container** (debug ou migrações manuais)

```bash
docker exec -it nest-app sh
```

---

## 📦 Estrutura do projeto (resumida)

```
src/
├── database/
│   ├── schema.ts            # Schemas Drizzle
│   ├── migrate.ts           # Script de migrações
│   └── drizzle.module.ts    # Módulo de conexão Drizzle
├── modules/
│   ├── auth/                # Autenticação e JWT
│   ├── users/               # Usuários
│   ├── clients/             # Clientes
│   └── farms/               # Fazendas
├── main.ts                  # Inicialização do NestJS
└── ...
```

---

## 🤝 Contribuições

Fique à vontade para abrir _issues_ ou _pull requests_.  
<br><br>

© 2025 FarmDex. Todos os direitos reservados.
