<h1 align="center" style="font-weight: bold;">Real Estate Agent SaaS - Backend</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
</p>

<p align="center">
    <b>Backend API for the Real Estate SaaS, built with NestJS and PostgreSQL, providing authentication, property management, and multi-tenancy support.</b>
</p>

<h2 id="technologies">Technologies</h2>

- [NestJS](https://nestjs.com/) — Node.js framework
- [PostgreSQL](https://www.postgresql.org/) — Relational Database
- [Prisma](https://www.prisma.io/) — ORM
- [Swagger](https://swagger.io/) — API Documentation
- [TypeScript](https://www.typescriptlang.org/) — Language
- [JWT](https://jwt.io/) — Authentication
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Encryption

<h2 id="started">🚀 Getting started</h2>

Here are some instructions to run locally this project.

<h3>Prerequisites</h3>

- [NestJS](https://nestjs.com/) — Backend Framework
- [PostgreSQL](https://www.postgresql.org/) — Database
- [Prisma](https://www.prisma.io/) — ORM
- [Swagger](https://swagger.io/) — API Documentation

<h3>Cloning</h3>

```bash
git clone https://github.com/real-estate-agent-saas/backend.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your Credentials

```yaml
DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
JWT_SECRET="suaChaveSecretaVemAqui"
NODE_ENV="development"
```

<h3>Starting</h3>

```bash
cd project-name
npm install
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route | description  
|----------------------|-----------------------------------------------------
| <kbd>GET /authenticate</kbd> | retrieves user info see [response details](#get-auth-detail)
| <kbd>POST /authenticate</kbd> | authenticate user into the api see [request details](#post-auth-detail)

<h3 id="get-auth-detail">GET /authenticate</h3>

**RESPONSE**

```json
{
  "name": "Fernanda Kipper",
  "age": 20,
  "email": "her-email@gmail.com"
}
```

<h3 id="post-auth-detail">POST /authenticate</h3>

**REQUEST**

```json
{
  "username": "fernandakipper",
  "password": "4444444"
}
```

**RESPONSE**

```json
{
  "token": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
}
```

<h2 id="colab">🤝 Collaborators</h2>

Special thank you for all people that contributed for this project.

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Gabuka">
        <img src="https://avatars.githubusercontent.com/u/17441601?v=4" width="100px;" alt="Gabriel Oka"/><br>
        <sub>
          <b>Gabriel Oka</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Rafa-Otsuka">
        <img src="https://avatars.githubusercontent.com/u/166652898?v=4" width="100px;" alt="Elon Musk Picture"/><br>
        <sub>
          <b>Rafaelle Otsuka</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/nhengler">
        <img src="https://avatars.githubusercontent.com/u/111945954?v=4" width="100px;" alt="Foto do Steve Jobs"/><br>
        <sub>
          <b>Steve Jobs</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
