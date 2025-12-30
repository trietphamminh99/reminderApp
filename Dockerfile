# Stage 1: Build React
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Node server with Express
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy React build from previous stage
COPY --from=builder /app/build ./build

# Copy the Express proxy server
COPY frontend-server.js ./

EXPOSE 80

# Start the frontend Express server
CMD ["node", "frontend-server.js"]
