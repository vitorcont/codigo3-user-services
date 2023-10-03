FROM node:16.14.0-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./node_modules ./node_modules
COPY ./dist ./dist


EXPOSE 3010
CMD [ "node", "./dist/main.js" ]