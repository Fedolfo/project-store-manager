# Gerenciamento-De-Loja


## Sobre o projeto


## Tecnologias utilizadas

* NodeJs
* Express
* Mocha, Chai e Sinon
* MYSQL
* Docker

## Para ser feito a instalação do projeto em sua máquina

Você tem a opção de usar o [docker](https://docs.docker.com/get-docker/)

Ou

1. Clone o repositório
```bash
  git clone `git@github.com:Fedolfo/project-store-manager.git`
```
2. Entre no arquivo
```bash
  cd project-store-manager
```
1. Para ocorrer tudo de acordo para API funcionar você deve ter o arquivo .env criado
```bash
  MYSQL_HOST=
  MYSQL_USER=
  MYSQL_PASSWORD=
  PORT=
```
4. Com todas as credências registradas para fazer conexão ao seu workbench ou docker, adicione o banco StoreManager.sql(banco não populado).

5. Para iniciar localmente
```bash
  npm start
```