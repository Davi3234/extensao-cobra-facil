# Extensão Cobra Fácil

Segue o passo para execução do projeto:

1.  Clone o repositório:

```bash
git clone https://github.com/Davi3234/extensao-cobra-facil.git
```

2. Tanto na pasta `/backend` e `/frontend` crie o arquivo `.env` seguindo o exemplo de cada disponível em `env.example`.

3. Na pasta raíz do projeto, rode o comando para levantar os serviços do Banco PostgreSQL e Backend com Spring Boot:

```bash
docker compose up db backend -d
```

5. Para o Frontend, dentro da pasta `/frontend`, rode o comando para instalar as dependências:

```bash
npm i
```

6. Para executar rode:

```bash
npm run dev
```

8. No navegador acesse http://localhost:3000 para acessar o sistema.
