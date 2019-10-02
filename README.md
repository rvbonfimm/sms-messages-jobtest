# sms-messages-jobtest
## :anger: O desafio: desenvolveder um encoder/decoder de textos/sequências baseado em um padrão antigo de teclado (botões entre 0 e 9) para criar a mensagem desejada:    
  - Exemplo: para digitar a mensagem TESTE DE MESA, será necessário apertar os botões 833777783303_33063377772;
  
URLs importantes:

:point_right: mLab mongodb public database: https://www.mlab.com/databases/heroku_phn2rgmc.
    
:exclamation: Necessário o arquivo .env para conectar ao banco de dados público (ou uma conexão local será criada  - veja o arquivo config/database.js);
  
Software's necessários:

    - Heroku-cli: https://devcenter.heroku.com/articles/heroku-cli;
    - Git-scm: https://git-scm.com/downloads;
    - NodeJS: https://nodejs.org/en/download/;
  
Passos para executar a aplicação local do Heroku:
  
    1. Fazer login no heroku-cli (em qualquer terminal, digitar o comando abaixo):
      $ heroku login;
    2. Clonar o repositório no Heroku/Git:
      $ heroku git:clone -a pacific-bayou-57849;
    3. Adicionar neste repositório criado o arquivo ".env" (responsável por especificar as variáveis de ambiente p/ conexão com o banco de dados);
    4. Baixar as dependências do projeto:
      $ npm install ou yarn;
    5. Subir a aplicação local do Heroku: 
      $ heroku local;
    5. Abrir o navegador e ser feliz: localhost:3000:
      > Apenas o e-mail se faz necessário para logar o usuário, sendo este: tester@alive.com;

O que o sistema pode fazer:
  - Login/logout;
  - Criar novas mensagens (texto ou sequência, tipo de redes GSM ou CDMA);
  - Consultar as mensagens criadas;
  - Consultar mensagem específica;

Para rodar a aplicação no modo dev:
  $ yarn dev;
  
Para rodar os testes da aplicação:
  $ yarn test;
