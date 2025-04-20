FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npx tsx drizzle/config.ts

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
