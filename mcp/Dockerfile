FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV MCP_HOST=0.0.0.0
ENV MCP_PORT=3000

EXPOSE 3000

CMD ["node", "dist/server.js"]
