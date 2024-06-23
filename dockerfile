FROM node:22 AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY *.json ./
RUN npm ci
COPY src/ ./src/
COPY public/ ./public/
RUN npm run build

FROM node:22-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build --chown=node:node /usr/src/app/node_modules/ ./node_modules/
COPY --from=build --chown=node:node /usr/src/app/dist/ ./dist/
COPY --from=build /usr/src/app/public/ ./public/
RUN npm ci
USER node
CMD ["dumb-init", "node", "dist/main.js"]
