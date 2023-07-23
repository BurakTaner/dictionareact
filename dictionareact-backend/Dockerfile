FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm

RUN pnpm i 

ENV PORT=3000

EXPOSE $PORT

COPY . ./

ENTRYPOINT [ "pnpm", "dev"]
