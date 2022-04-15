FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

RUN adduser -D StoreManager

USER StoreManager

ENTRYPOINT ["node", "index.js"]