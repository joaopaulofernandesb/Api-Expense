# Api-Expense

Esta é uma API para gerenciar despesas. Ela permite que você crie, leia, atualize e exclua despesas, além de fornecer informações estatísticas sobre as despesas registradas.

## Funcionalidades

- Criação de despesas
- Leitura de despesas
- Atualização de despesas
- Exclusão de despesas
- Estatísticas de despesas

## Tecnologias utilizadas

- Node.js
- Express.js
- MongoDB
- Docker
- Kubernetes
- Minikube

## Pré-requisitos

- Node.js (v14.17.0 ou superior)
- MongoDB (v4.4.0 ou superior)
- Docker (v20.10.0 ou superior)
- Kubernetes (v1.21.0 ou superior)
- Minikube (v1.23.0 ou superior)

## Instalação

1. Clone o repositório:

git clone https://github.com/joaopaulofernandesb/Api-Expense.git

2. Instale as dependências:

 npm install

3. Configure as variáveis de ambiente:

Renomeie o arquivo `.env.example` para `.env` e atualize as variáveis de acordo com a sua configuração.

4. Inicie o servidor:

 npm start

A API estará disponível em `http://localhost:3000`.

## Docker e Kubernetes

Você pode executar a API no Docker e no Kubernetes usando o Minikube. Certifique-se de que o Minikube e o Kubernetes estejam instalados.

1. Inicie o cluster do Minikube:

 minikube start

2. Execute o script de implantação (deployment.sh) para criar e implantar os recursos no Kubernetes:

 sh deployment.sh


Isso criará os objetos Kubernetes necessários, como pods, serviços e deployments, para executar a API.

3. Verifique o status da implantação:

   kubectl get all

Isso exibirá o status de todos os recursos implantados no Kubernetes.

## Uso

A API possui as seguintes rotas:

- `GET /expenses`: Retorna todas as despesas registradas.
- `GET /expenses/:id`: Retorna uma despesa específica com base no ID fornecido.
- `POST /expenses`: Cria uma nova despesa.
- `PUT /expenses/:id`: Atualiza uma despesa existente com base no ID fornecido.
- `DELETE /expenses/:id`: Exclui uma despesa existente com base no ID fornecido.
- `GET /statistics`: Retorna informações estatísticas sobre as despesas registradas.

Consulte a documentação da API para obter mais detalhes sobre os parâmetros e respostas de cada rota.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
