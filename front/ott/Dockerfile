# Use the official Node.js image.
FROM node:16 AS build

# Set the working directory.
WORKDIR /app

# Install dependencies and build the project.
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve the app with Nginx.
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
