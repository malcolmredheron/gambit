FROM node:20.11.0
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm i -g ts-node
EXPOSE 8080
CMD ["npm", "start"]
