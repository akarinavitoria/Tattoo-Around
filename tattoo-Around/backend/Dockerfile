# Dockerfile para o backend

# Utilize a imagem Node 16 baseada no Alpine para um container mais leve
FROM node:16-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Expõe a porta 5000 (certifique-se de que sua aplicação esteja utilizando essa porta)
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
