# Base stage
# ---------------------------------------
FROM node:18-bullseye-slim AS base

# This get shared across later stages
WORKDIR /node
RUN chown node:node /node
USER node

# Development stage
# ---------------------------------------
FROM base AS development

USER root
RUN \
  apt-get -yq update && \
  apt-get -yq install curl 
USER node
RUN echo 'alias ll="ls -als"' >> ~/.profile

ENV NODE_ENV=development
ENV SHOW_DOCS=true
ENV SERVER_PORT=3000
ENV PATH /node/node_modules/.bin:$PATH
EXPOSE $SERVER_PORT 9229

COPY --chown=node:node package*.json ./
RUN \
  npm i

# WORKDIR /node/app

CMD ["ts-node-dev", "--inspect=0.0.0.0:9229", "app/server.ts"]

# Test stage
# ---------------------------------------
FROM base AS test

ENV NODE_ENV=development
ENV SERVER_PORT=3000
ENV PATH /node/node_modules/.bin:$PATH
COPY --chown=node:node package*.json ./

RUN \
  npm ci

COPY --chown=node:node ./app ./app
COPY --chown=node:node ./jest.config.js .
COPY --chown=node:node ./tsconfig.json .
COPY --chown=node:node ./tsconfig.spec.json .

RUN \
  npm run test

# Production stage
# ---------------------------------------
FROM base as preproduction

ENV NODE_ENV=development
ENV SERVER_PORT=3000

COPY --chown=node:node package*.json ./

RUN \
  npm ci

COPY --chown=node:node ./app ./app
COPY --chown=node:node ./tsconfig.build.json .

RUN \
  npm run build

COPY --chown=node:node ./app/api-doc.yml ./dist  

ENV NODE_ENV=production
RUN \
  npm ci --no-optional --production 
# ---------------------------------------
FROM gcr.io/distroless/nodejs:18 as production

WORKDIR /node

ENV NODE_ENV=production
ENV SERVER_PORT=3000

COPY --from=preproduction /node/node_modules ./node_modules
COPY --from=preproduction /node/dist .

EXPOSE $SERVER_PORT

CMD ["server.js" ]
