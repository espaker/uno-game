FROM node:14.17-alpine as build
WORKDIR /usr/src/app
RUN mkdir ../shared
COPY ./shared ../shared
COPY ./unoenty/package.json ./
RUN yarn
COPY ./unoenty .
RUN yarn build
RUN rm -r ../shared

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
