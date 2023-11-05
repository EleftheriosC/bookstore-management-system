FROM node:21-alpine3.17
WORKDIR /app
COPY package.json
COPY package-lock.json
RUN npm install
COPY ..
RUN npm build

FROM nginx:1.25.3
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]