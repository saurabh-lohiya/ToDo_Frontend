FROM node:14-alpine AS build
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build