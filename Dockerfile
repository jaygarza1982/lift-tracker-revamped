#Build frontend web server
FROM node:21-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

#Build web server with built react app
FROM nginx:1.25

COPY --from=build /app/build /usr/share/nginx/html