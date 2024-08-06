# Fetching the latest node image on alpine linux
FROM node:latest

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package*.json /app

RUN npm install

# Copying all the files in our project
COPY . .
