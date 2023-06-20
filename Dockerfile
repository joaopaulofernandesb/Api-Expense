# Use uma imagem base adequada para o seu aplicativo
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo .env para o contêiner
COPY .env .env

# Copie os arquivos de origem do seu aplicativo para o contêiner
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie os arquivos restantes do aplicativo para o contêiner
COPY . .

# Exponha a porta em que o aplicativo está sendo executado
EXPOSE 3000

# Defina o comando para iniciar o aplicativo
CMD ["npm","run","dev"]
