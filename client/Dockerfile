# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose port (Vite preview default is 4173)
EXPOSE 4173

# Start the application
CMD ["npm", "run", "preview"]
