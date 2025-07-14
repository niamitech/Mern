# backend/Dockerfile

FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose port and run app
EXPOSE 5000
CMD ["npm", "run", "dev"]
