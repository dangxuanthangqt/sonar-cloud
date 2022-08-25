FROM node:16 AS builder

WORKDIR /opt/build/app

COPY package* .
COPY yarn.lock .

RUN npx yarn install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /opt/build/app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf