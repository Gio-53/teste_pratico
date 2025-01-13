# teste_pratico
Um pequeno crud usando php e js
### faça o download do software xampp para criação do servidor php;
Recomendo que abra o arquivo de instalação como administrador e siga o processo de instalação;
clique na opção start de apache e mysql conforme a imagem;
![image]xampp_modules.png
antes de iniciarmos será necessário criar o banco de dados, clique na opção admin conforme a imagem
clique na opção sql e insira o código abaixo.

CREATE DATABASE 'defaultdb';

USE 'defaultdb';

CREATE TABLE  'users' (
    'id' INT AUTO_INCREMENT PRIMARY KEY,
    'name' VARCHAR(255) NOT NULL,
    'email' VARCHAR(255) NOT NULL UNIQUE,
    'password' VARCHAR(255) NOT NULL
);
pronto nosso banco já está criado, agora você deve copiar a pasta "back-end" e cola-lá no repositório htdocs aonde você instalou o xampp.

Depois disso você pode abrir o arquivo index.html dentro da pasta "principal">dentro da pasta "front-end"
a partir daí já é possível adicionar os cadastros através do nosso programa e utilizar o programa
