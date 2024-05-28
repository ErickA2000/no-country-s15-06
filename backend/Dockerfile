#* With npm FUNCIONA
#* Stage 1
FROM node:22 AS build

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

#* Stage 2
FROM node:22-alpine3.19

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

RUN npx prisma migrate dev --name initial
RUN npx prisma generate
RUN npm install --omit=dev

ENTRYPOINT [ "node", "dist/main.js" ]

#* With pnpm
#* Base
# FROM node:22 AS base
# # # Install pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# WORKDIR /app

# COPY package*.json .
# COPY pnpm*.yaml .
# COPY prisma ./prisma

# COPY . .
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --prod


# #* Build
# FROM base AS build

# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

# RUN pnpm exec prisma generate
# RUN pnpm run build

# USER node

# #* prod deps
# FROM base as prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts
# USER node

# #* Prod
# FROM node:22-alpine3.19

# WORKDIR /app

# COPY --from=build /app/package*.json ./
# COPY --from=build /app/pnpm*.yaml ./
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/prisma ./prisma
# COPY --from=prod-deps /app/node_modules ./node_modules

# RUN npx prisma generate

# ENTRYPOINT [ "node", "dist/main.js" ]

# #* Stage 1
# FROM node:22 as development
# RUN corepack enable pnpm && corepack use pnpm@latest

# WORKDIR /app

# COPY --chown=node:node pnpm-lock.yaml ./

# RUN pnpm fetch

# COPY --chown=node:node . .
# RUN pnpm install
# RUN pnpm exec prisma generate

# USER node

# #* Stage 2
# FROM node:22 as build

# RUN corepack enable pnpm && corepack use pnpm@latest

# WORKDIR /app

# COPY --chown=node:node pnpm-lock.yaml ./
# COPY --chown=node:node --from=development /app ./node_modules
# COPY --chown=node:node . .

# RUN pnpm install --prod
# RUN pnpm run build

# USER node

# #* Stage 3

# FROM node:22-alpine3.19

# COPY --chown=node:node --from=build /app/node_modules ./node_modules
# COPY --chown=node:node --from=build /app/dist ./dist

# CMD [ "node", "dist/main.js", ]



###################
# BASE
###################
# FROM node:22 AS base

# # Install pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # Create app directory
# WORKDIR /app
# #!
# #COPY --chown=node:node package.json pnpm-lock.yaml ./ 
# #!

# COPY --chown=node:node . .
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --prod

# ###################
# # PROD DEPS
# ###################
# FROM base AS prod-deps
# ENV NODE_ENV production
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts
# USER node

# ###################
# # BUILD STAGE
# ###################
# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
# RUN pnpm prisma generate
# RUN pnpm build
# USER node

# ###################
# # PRODUCTION STAGE
# ###################
# FROM node:22-alpine3.19 AS prod

# WORKDIR /app

# # Only copy built files and production node_modules
# COPY --chown=node:node --from=prod-deps app/node_modules ./node_modules
# COPY --chown=node:node --from=build app/dist ./dist

# #!
# #COPY --chown=node:node --from=build /app/.prisma ./.prisma
# #COPY --chown=node:node --from=build /app/prisma ./prisma
# #!

# # Start the server using the production build
# CMD [ "node", "dist/main.js" ]