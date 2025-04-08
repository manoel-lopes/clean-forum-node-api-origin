# Clean Forum Node API

## 🎯 Business Rules

- Users can create questions and answers.
- Questions can be edited, commented on, or marked as solved.
- Answers can be upvoted and selected as the best answer.
- Only the author can edit or delete their content.
- Votes and best answers influence user reputation (not yet implemented).

## ⚙️ Functional Requirements

- User registration and authentication.
- Create, edit, and delete questions and answers.
- List questions by recent, popular, and unanswered.
- Search for questions by keywords.
- Comment on questions and answers.
- Vote on answers.
- Select a best answer.

## 🔒 Non-Functional Requirements

- Codebase using Clean Architecture and DDD principles.
- Unit and integration tests.
- RESTful API using Fastify.
- Environment configuration through `.env`.
- Database migrations.
- Dockerized services for development.

## ✨ Technologies

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg" alt="Fastify" height="20"/> [Fastify](https://fastify.io/)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" height="20"/> [TypeScript](https://www.typescriptlang.org/)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" height="20"/> [Docker](https://www.docker.com/)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" height="20"/> [PostgreSQL](https://www.postgresql.org/)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" height="20"/> [Redis](https://redis.io/)
- <img src="https://raw.githubusercontent.com/colinhacks/zod/main/logo.svg" alt="Zod" height="20"/> [Zod](https://zod.dev/)
- <img src="https://avatars.githubusercontent.com/u/116302963?s=200&v=4" alt="Drizzle ORM" height="20"/> [Drizzle ORM](https://orm.drizzle.team/)
- <img src="https://vitest.dev/logo.svg" alt="Vitest" height="20"/> [Vitest](https://vitest.dev/)
- <img src="https://avatars.githubusercontent.com/u/19800093?s=200&v=4" alt="Supertest" height="20"/> [Supertest](https://github.com/visionmedia/supertest)
- <img src="https://camo.githubusercontent.com/671b4081cb49354be80e1fdfc034d6eb9f4084c7718286fd888b61749c4fbc7b/68747470733a2f2f6875736b792e696d672f6875736b792d6c6f676f2e737667" alt="Husky" height="20"/> [Husky](https://typicode.github.io/husky/)



## 🛠️ Design Patterns

- 🔌 Adapter  
- 🧩 Strategy  
- 🗄️  Repository  
- 🏭 Factory  
- 🏗️  Static Factory Method  
- 🛠️  Abstract Factory  
- 🛡️  Proxy 


## 🖌️ Design Approaches

- 🌐 Domain-driven development (DDD)  


## 🔍 Test Patterns

- 🎭 Fake  
- 🔗 Stub
- 👀 Spy
- 🗂️  In Memory DataBase


## 📜 Test Conventions

- 🖥️  System Under Test (SUT)
