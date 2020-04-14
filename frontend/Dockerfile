FROM node:10-alpine
WORKDIR app
COPY ./ /app
RUN yarn && yarn build

FROM nginx:alpine
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/dist /usr/share/nginx/html
