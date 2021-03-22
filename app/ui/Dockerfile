FROM node:latest

WORKDIR /ui

ENV PATH /ui/node_modules/.bin:$PATH

COPY package.json /ui/
COPY package-lock.json /ui/
COPY yarn.lock /ui/
COPY ./public/ /ui/public
COPY ./src/ /ui/src

RUN npm install
RUN npm config set unsafe-perm true

EXPOSE 3000

CMD ["npm", "start"]
