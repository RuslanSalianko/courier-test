FROM node:22-alpine AS base

RUN npm install -g npm@11.2.0

FROM base AS builder

WORKDIR /app

COPY ./backend /app/backend
COPY ./frontend /app/frontend

WORKDIR /app/backend
RUN npm install
RUN npm run build

WORKDIR /app/frontend 

RUN npm install
RUN npm run build

FROM base AS production
RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app/backend ./backend

COPY --from=builder /app/frontend/dist ./backend/dist/static

WORKDIR /app/backend
RUN npm install --omit=dev

EXPOSE 3000

CMD ["bash", "-c", "npm run start:prod"]

