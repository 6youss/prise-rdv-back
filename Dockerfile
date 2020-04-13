FROM node:alpine

WORKDIR /app
COPY package.json .
COPY . .

RUN npm install
RUN npm run build-ts

EXPOSE 8000
CMD npm run serve
