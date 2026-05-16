FROM node:20.20.2-slim

WORKDIR /app

COPY package.json .
RUN yarn install --prod

COPY . .
CMD ["yarn", "start"]
