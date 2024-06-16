FROM node:slim

WORKDIR /app

COPY *.json ./
COPY *.lock ./

RUN yarn

COPY ./ ./

RUN yarn build
