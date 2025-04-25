# Dockerfile
FROM node:20

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./ 
RUN npm install

# Copia todos os outros arquivos
COPY . .

# Compila a aplicação
RUN npm run build

# Verifica se os arquivos estão no diretório correto
RUN ls -la /app/dist/src

# Expõe a porta que o Nest está ouvindo
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
