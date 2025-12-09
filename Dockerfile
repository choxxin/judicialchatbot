# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files for both client and server
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies for server
WORKDIR /app/server
RUN npm install

# Install dependencies for client
WORKDIR /app/client
RUN npm install

# Copy the rest of the application
WORKDIR /app
COPY . .

# Expose ports
# 5173 for Vite dev server (client)
# 8000 for server port
EXPOSE 5173 8000

# Install concurrently to run both services
RUN npm install -g concurrently

# Start both client and server
CMD ["concurrently", "--kill-others", "npm run dev --prefix client", "npm run dev --prefix server"]
