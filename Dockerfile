FROM node:18.16.0

ARG COMMIT_HASH=""
ENV COMMIT_HASH=${COMMIT_HASH}

RUN echo "COMMIT_HASH: ${COMMIT_HASH}"

RUN apt-get update && apt-get install -y docker.io

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]