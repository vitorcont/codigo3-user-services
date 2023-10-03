FROM node:16.14.0-alpine

WORKDIR /usr/src/app

COPY ./package.json .
RUN npm install --force
RUN npx prisma generate
RUN npm run build

EXPOSE 3010
CMD [ "node", "./dist/main.js" ]