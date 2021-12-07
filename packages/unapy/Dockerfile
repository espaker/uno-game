FROM node:14.17-alpine
WORKDIR /usr/src/app
RUN mkdir ../shared
COPY ./shared ../shared
COPY ./unapy/package.json ./
RUN apk --no-cache --virtual build-dependencies add python make g++ 
RUN yarn 
RUN apk del build-dependencies
COPY ./unapy .
RUN yarn build
RUN rm -r ../shared
EXPOSE 5000
CMD ["yarn", "start"]
