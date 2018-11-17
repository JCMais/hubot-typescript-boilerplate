FROM node:10-alpine as builder

# Install git so patch-package works
RUN apk add --no-cache bash git openssh

WORKDIR /app

COPY package.json yarn.lock external-scripts.json ./

COPY tools ./tools

RUN yarn --pure-lockfile

ADD . .

RUN yarn build

FROM node:10-alpine

WORKDIR /hubot/code

ARG PORT=3000

ENV PORT ${PORT}

ENV NODE_ENV production

COPY --from=builder /app .

EXPOSE ${PORT}

ENTRYPOINT [ "yarn", "start" ]
