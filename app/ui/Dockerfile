FROM node:alpine

WORKDIR /ui

ENV PATH /ui/node_modules/.bin:$PATH

COPY package*.json /ui
COPY yarn.lock /ui
RUN npm install

COPY . /ui

EXPOSE 3000

CMD ["npm", "start"]
