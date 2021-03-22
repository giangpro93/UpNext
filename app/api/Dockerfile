FROM node:latest

WORKDIR /api

ENV PATH /api/node_modules/.bin:$PATH
ENV NODE_ENV development

COPY package.json /api/
COPY package-lock.json /api/
COPY knexfile.js /api/
COPY .env /api/.env
COPY src /api/src

RUN npm install
RUN npm config set unsafe-perm true

COPY . /api

EXPOSE 9000