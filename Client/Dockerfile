FROM node:14

ARG SERVER_IP

COPY src ./src
COPY public ./public
COPY package.json package-lock.json tsconfig.json ./

RUN echo "REACT_APP_SERVER_IP=${SERVER_IP}" >> .env
RUN echo "REACT_APP_CHANNEL_NAME=${CHANNEL_NAME}" >> .env

RUN npm ci
RUN npm run build
RUN npm i -g serve

EXPOSE 5000
ENTRYPOINT ["serve", "-s", "build"]