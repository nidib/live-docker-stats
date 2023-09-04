FROM node:18.16.0

RUN apt-get update && apt-get install -y docker.io

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]