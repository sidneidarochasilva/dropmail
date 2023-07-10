FROM node:lts-alpine
WORKDIR /src/app
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:1.21
COPY . .

EXPOSE 3000