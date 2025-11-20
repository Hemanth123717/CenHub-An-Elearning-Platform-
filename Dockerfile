# only for build file
# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy build folder
COPY dist/ ./dist

# Install serve
RUN npm install -g serve

# Expose port
EXPOSE 8001

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "8001"]