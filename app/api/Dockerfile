FROM node:latest

WORKDIR /api

ENV PATH /api/node_modules/.bin:$PATH
ENV NODE_ENV development

# RUN mkdir /api/node_modules
# RUN chmod -R 777 /api/node_modules

COPY package.json /api/
COPY package-lock.json /api/
RUN npm install
RUN npm config set unsafe-perm true

COPY . /api

EXPOSE 9000

USER 1000