# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

ARG DB_BASE_URL
ENV DB_BASE_URL=$DB_BASE_URL

RUN npm install -g dotenv-cli

COPY package.json ./
COPY package-lock.json* ./
COPY global.css .

RUN npm ci

COPY . .
RUN npx dotenv -e .env -- npx expo export --platform web

# Production stage
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve@14.2.0

COPY --from=builder /app/dist ./dist

EXPOSE 8081

CMD ["serve", "-s", "dist", "-l", "8081"]
