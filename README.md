
# FoodExplorer BackEnd

FoodExplorer é um site que permite aos usuários comprar alimentos. É um mercado online onde os usuários podem encontrar uma ampla variedade de produtos alimentícios. O aplicativo permite que os usuários busquem produtos pelo nome ou pelo ingrediente.

## Como usar

Você pode logar como dois tipos de usuários: admin e comum. Para logar como admin existe apenas um usuário e como este projeto não é comercial vou disponibilizar aqui

```
email: admin@email.com
senha: 123456789
```

Para logar como comum, basta se registrar caso não tenho criado o usuário.

**Observações**: Como estou usando um plano gratuito do Render, plataforma usado para host do backend, quando o servidor fica em inatividade por um tempo, ele começa a desligar em um certo tempo. Então, no primeiro acesso depois um tempo sem utilizar a aplicação, pode demorar alguns minutos até o servidor voltar a funcionar normalmente.


## Requisitos

- [x] Armazenamento dos dados de admin, restaurante e usuários em banco de dados.
- [x] Autenticação JWT com validação de senha para entrada na aplicação.
- [x] Nomes significativos para funções, variáveis, classes, arquivos, tabelas e outros elementos do código.
- [x] Busca por nome do prato e ingredientes para usuário e admin.
- [x] Upload de imagens para cadastrar pratos pelo admin.
- [x] Aplicação responsiva seguindo o conceito Mobile First e modelo do Figma.
- [x] README bem detalhado no front-end e back-end com link do deploy, previews e instruções de execução do projeto.
- [x] Uso de animações, transições e transformações para melhorar a experiência da aplicação.
- [x] Consumo da própria API pela aplicação.
- [x] Deploy da aplicação (front-end e back-end).


## Autores

- [@mati-pereira](https://www.github.com/mati-pereira)

## Deploy

[Aqui](https://admirable-tiramisu-e924f5.netlify.app/)

## Demonstração
![gifvideo](https://user-images.githubusercontent.com/94717377/235565105-3e99554e-2471-4e71-a9bb-e592850daab8.gif)


## Stack utilizada

**Back-end:** express, sqlite, knex.js, multer.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Mati-Pereira/foodexplorer-front
```

Entre no diretório do projeto

```bash
  cd foodexplorer-front
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`JWT_SECRET`,<br/>
`JWT_EXPIRES_IN`,<br/>
`PORT`

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portifolio-new-4q6j.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mati-pereira/)
