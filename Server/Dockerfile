FROM node:10

COPY ./src ./src
COPY .babelrc package-lock.json package.json tsconfig.json ./

RUN npm ci
RUN npm run build:js

EXPOSE 8080
ENTRYPOINT ["node", "./lib/index.js"]