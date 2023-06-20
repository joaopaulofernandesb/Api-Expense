#!/bin/bash

# Inicializa o Minikube
minikube start
kubectl config use-context minikube

# Define as variáveis de ambiente do Docker para usar o ambiente do Minikube
eval $(minikube docker-env)

# Constrói a imagem do Docker
docker build -t api-expense .

# Inicia o contêiner Docker
docker run -d --name api-expense api-expense

# Aplica o arquivo deployment.yaml
kubectl apply -f deployment.yaml

# # Aguarda até que todos os pods estejam em execução
kubectl wait --for=condition=Ready pods --all --timeout=5m

# Obtém os deployments, pods e serviços
kubectl get deployments
kubectl get pods
kubectl get services

minikube service list


