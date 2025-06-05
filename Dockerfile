# First stage: build the app using Node.js
FROM --platform=linux/amd64 node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json + lock file
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the React app (outputs to /app/build)
RUN npm run build


# Second stage: serve the build using nginx
# We don’t need Node anymore. We just need to serve the static files.
FROM --platform=linux/amd64 nginx:alpine

# Copy built frontend from previous stage to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Start nginx as foreground (daemon off will keep the container running in forgrnd not background) 
CMD ["nginx", "-g", "daemon off;"]
