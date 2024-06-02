# Use an official Node.js runtime as the base image
FROM node:20 as development

# Set the working directory in the container
WORKDIR /app

# Set permissions for the '/app' directory
RUN chown -R node:node /app

# Switch to the node user
USER node

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Expose the development server port (3000)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
