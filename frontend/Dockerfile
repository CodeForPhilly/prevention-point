FROM node:10-alpine
WORKDIR app
COPY ./ /app
RUN yarn && yarn build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
