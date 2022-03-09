FROM node:14

WORKDIR /app
COPY ./src /app/src
COPY ./public /app/public
COPY package-lock.json package.json tsconfig.json rollup.config.js /app/

RUN npm ci
RUN npm run build
RUN npm i -g serve

EXPOSE 5000
ENTRYPOINT ["serve", "-s", "public" ]
