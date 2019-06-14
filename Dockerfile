FROM node:lts

EXPOSE 80
ENV APP_PORT 80

# add app dir
COPY ./app /srv/app
WORKDIR /srv/app

# build app
RUN npm install \
  && npm run build

CMD ["npm start -s"]
