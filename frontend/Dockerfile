# Stage 1: Build React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build files to Nginx's default html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 for serving frontend
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
