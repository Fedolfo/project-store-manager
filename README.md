# Gerenciamento-De-Loja


## Sobre o projeto

Projeto de sistema de gerenciamento de vendas

## Tecnologias utilizadas

* JavaScript
* NodeJs
* Express
* Mocha, Chai e Sinon
* MYSQL
* Docker

## Para ser feito a instalação do projeto em sua máquina

É necessário ter [docker](https://docs.docker.com/get-docker/) e [docker-compose](https://docs.docker.com/compose/install/)

1. Clone o repositório
```bash
  git clone `git@github.com:Fedolfo/project-store-manager.git`
```
2. Entre no arquivo
```bash
  cd project-store-manager
```
3. Suba os containêrs
```bash
  npm run compose:up **ou** docker-compose up -d --build
```
4. No momento que subir os containêrs retornará essa messagem no terminal
```bash
  Creating db ... done
  Creating backend_store_manager... done
```
5. Para adicionar o banco de dados relacionado ao projeto, deve acessar StoreManager.sql e rodar as querys de criação.(solução temporária).

6. Para acessar a aplicação
```bash
  back-end: localhost:3000
```

7. Por fim para remover os containêrs
```bash
  npm run compose:down **ou** docker-compose down --remove-orphans
```
