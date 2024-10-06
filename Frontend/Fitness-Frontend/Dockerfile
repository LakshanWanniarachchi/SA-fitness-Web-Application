# Stage 1: Build the React app
FROM node:16-alpine as build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build files to the Nginx html folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 3000

# Run Nginx in the foreground (not in daemon mode)
CMD ["nginx", "-g", "daemon off;"]
