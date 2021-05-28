FROM node:16-alpine as build-step

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:alpine

COPY --from=build-step /app/build /usr/share/nginx/html
