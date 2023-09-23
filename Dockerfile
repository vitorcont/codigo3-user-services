FROM node:16.14.0-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY ./dist ./dist
COPY ./node_modules ./node_modules

EXPOSE 3010
CMD [ "node", "./dist/main.js" ]