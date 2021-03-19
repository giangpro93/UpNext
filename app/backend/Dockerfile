FROM node:latest

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH
ENV NODE_ENV development

COPY package*.json /backend
RUN npm install

COPY . /backend

EXPOSE 9000

CMD ["sh", "-c", "node ./db_initialize.js && npm run start"]