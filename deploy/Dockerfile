FROM digibank-docker-group-nexus.bankartos.io/node:14.9.0-alpine3.12

ARG DIST_FILE
ARG NODE_MODULES

WORKDIR /app
COPY ${NODE_MODULES} /app/node_modules/
COPY ${DIST_FILE} /app/

RUN apk add jq

COPY deploy/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN ln -s /usr/local/bin/docker-entrypoint.sh /

RUN adduser -s /bin/sh -D jago
USER jago 

ENTRYPOINT ["docker-entrypoint.sh"]
CMD npm run migrate:up && node scheduler/index.js && node src/server.js
