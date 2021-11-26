# FILMES EM ESTREIA

Projeto criado visando resolver o problema proposto abaixo:

```
Olá, meu nome é João, sou gerente de um cinema e atualmente estamos com muitos lançamentos de novos 
filmes, precisamos catalogá-los e organizá-los em algum sistema onde fosse possível, além de 
cadastrar e listar, ordenar e realizar a paginação dos filmes. Possuo 2 funcionários, o Claudio 
que será responsável por cadastrar os filmes, o Adalberto que ficaria responsável por análisar e 
autorizar o lançamento do filme no sistema. Também seria legal se o sistema pudesse remover o 
filme automaticamente assim que sair do cartaz, passando pela minha autorização. Você pode me ajudar?
```

https://github.com/Mestres-da-Web/desafio-backend-pleno

## Tecnologias usadas

1. NodeJs 

2. Typescript
3. ExpressJs
4. Autenticação com JWT
5. Banco de dados relacional SQLite

## Documentação

A documentação junto a um test drive da aplicação se encontram no **Postman**:

https://www.postman.com/speeding-escape-366395/workspace/cinema

o projeto esta executando no Heroku:

http://cinema-2322.herokuapp.com/

como esta executando no plano gratuito pode ser derrubado se ficar muito tempo sem ser usado, podendo levar a tempos longos de espera na primeira requisição.

## Iniciar

### Criar Cinema

O primeiro passo é criar um Cinema, junto disso sera criado uma conta Admin.

```JSON
{
    "cinema": {
        "name": "teste202",
        "address": "Teste"
    },
     "user": {
        "name": "teste",
        "email": "test@test.com",
        "password": "Test12345678"
    }
}
```

Usar o método POST no Link:  http://cinema-2322.herokuapp.com/cinema



### Efetuar Login



Depois de o cinema e o administrador estarem criados é necessario fazer o login

```JSON
{
    "email": "test@test.com",
    "password": "Test12345678"
}
```

Usar o método POST no Link:  http://cinema-2322.herokuapp.com/users/login



ira retornar um **JWT**, ele sera usado no cabeçario das proximas requisições para autenticação



### Publicar um Filme

Por ultimo vamos publicar um filme, temos que cria-lo primeiro

```form-data
name:Vingadores
about:Descrição
release_date:2020/11/01
maximum_date:2021/12/30
```

Usar o método POST no Link:  http://cinema-2322.herokuapp.com/movie

é nessa fase que se pode enviar junto as fotos dos banners do filme, por isso no **Postman** usamos a função **form-data** que nos da suporte a isso, as imagens devem ser colocadas no campo **images**



os dados do filme serão vistos aqui:

http://cinema-2322.herokuapp.com/movie/all

**é nessesario o uso do JWT em todas as requisições**



pode-se também usar paramentro nessa função como **page** indicando que pagina quer ir e 

**limit** indicando quantos itens deve ter por pagina, e tambem pode-se pesquisar o filme pelo nome com **name**

http://cinema-2322.herokuapp.com/movie/all?page=2&limit=3&name=Vin





## Agradeceimento

Obrigado por usar meu projeto, espero que tenha gostado

Sinta-se a vontade para entrar em contato caso tenha achado algum bug

lucagregolini@gmail.com
