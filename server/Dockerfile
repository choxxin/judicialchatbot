# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Expose port (adjust if your server uses a different port)
EXPOSE 8080

# Start the application with nodemon for development
CMD ["npm", "run", "dev"]
