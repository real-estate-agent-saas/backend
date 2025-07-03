# 🏡 Backend do Projeto Imobiliário (NestJS)

Este é o backend do sistema de gestão de imóveis para corretores. Ele utiliza **NestJS**, **Prisma**, **JWT**, entre outras bibliotecas.

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório
- git clone https://github.com/seu-usuario/seu-projeto.git
- cd seu-projeto

### 2. Instale as dependências
- npm install

### 3. Configure o .env
- DATABASE_URL=postgresql://usuario:senha@localhost:5432/banco
- JWT_SECRET=sua_chave_super_secreta

### 4. Gere o cliente Prisma
- npx prisma generate

### 5. Suba as migrations (opcional, se ainda não houver banco)
- npx prisma migrate dev

### 6. Rode o projeto
- npm run start:dev

### 📦 Pacotes principais
- NestJS
- Prisma
- JWT
- Bcrypt
- Class-validator / Class-transformer
- Swagger

# ------------------ 🗃️ COMANDOS NEST ÚTEIS ------------------ #

NESTJS - Nessa ordem definida:

nest g resource [nome] - Gera o conjunto completo além de DTO e Entity
├── nest g controller [nome] - Gera o Controller
├── nest g service [nome] - Gera o Service
├── nest g module [nome] - Gera o Module

PRISMA:

- Alterei o schema e quero aplicar no banco                 ->  npx prisma migrate dev --name nome-da-migration
- Alterei diretamente no banco e quero atualizar o Prisma   ->  npx prisma db pull
- Gerar ou atualizar o Prisma Client	                    ->  npx prisma generate

