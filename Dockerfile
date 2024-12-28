FROM node:20.17.0
WORKDIR /app
COPY package*.json ./
COPY .env.dev .env
COPY . . 
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]