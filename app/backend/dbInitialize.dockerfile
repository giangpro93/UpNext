FROM node

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH
COPY package*.json /backend
RUN npm install

COPY . /backend