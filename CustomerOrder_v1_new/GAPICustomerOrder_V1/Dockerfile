FROM node:6.11-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run api
EXPOSE 9001
