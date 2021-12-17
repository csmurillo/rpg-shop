FROM node:13-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN npm install

CMD ["npm","start"]
