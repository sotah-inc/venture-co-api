# running
FROM node:10-alpine

# misc
ENV DB_HOST 0.0.0.0
ENV DB_PASSWORD=
ENV NATS_HOST 0.0.0.0
ENV NATS_PORT 0
ENV PORT 8080
ENV NODE_ENV=production

# copying in source
COPY ./app /srv/app
WORKDIR /srv/app

# copying in built app
COPY --from=ihsw/sotah-api/build /srv/app/build ./build
COPY --from=ihsw/sotah-api/build /srv/app/node_modules ./node_modules

CMD ["npm", "start", "-s"]
