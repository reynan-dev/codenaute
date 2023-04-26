FROM node:16-alpine AS base

RUN npm i -g pnpm --latest
RUN npm i -g expo-cli --latest
RUN npm i -g eas-cli --latest

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM dependencies AS development

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
CMD pnpm start

FROM dependencies AS test

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
CMD pnpm test
