FROM node:16-alpine AS base

RUN npm i -g pnpm --latest

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ENV NODE_PATH=dist/
CMD pnpm start:watch

# FROM base AS deploy

# RUN pnpm prune --prod
# WORKDIR /app
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules

# CMD ["node", "dist/index.js"]
