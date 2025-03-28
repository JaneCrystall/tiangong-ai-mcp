FROM node:22

WORKDIR /app

COPY ./dist/src /app

COPY .env /app/.env

CMD ["node index.js"]