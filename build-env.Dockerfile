# building
FROM node

# copying in source
COPY ./app /srv/app
WORKDIR /srv/app

# installing deps and building
RUN npm install \
  && npm run -s build

# removing dev/build deps and installing only prod deps
RUN rm -rf ./node_modules \
  && npm install --only=production

# slimming down the build
RUN npm cache clean --force
