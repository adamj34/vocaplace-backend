FROM node:20.11.1-alpine3.18

WORKDIR /opt/app

COPY ./package*.json .

RUN npm install --production=false

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
