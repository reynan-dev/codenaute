FROM node:16-alpine AS base

RUN npm i -g pnpm --latest

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM dependencies AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ENV NODE_PATH=dist/
CMD pnpm build

FROM dependencies AS development

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
CMD pnpm start:watch

FROM dependencies AS test

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
CMD pnpm test:watch

FROM build AS production
# TODO: remove all dev dependencies and files, like src folder.
WORKDIR /app
RUN pnpm prune --prod
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]
