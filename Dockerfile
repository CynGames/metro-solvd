# Use the official Node.js image as a base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Python and build-essential
RUN apt-get update && apt-get install -y python build-essential

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

#FROM node:16-alpine
#
#WORKDIR /app
#COPY package.json .
#RUN npm install --production
#
#COPY . .
#
#EXPOSE 3000
#
#CMD ["node", "index.js"]
