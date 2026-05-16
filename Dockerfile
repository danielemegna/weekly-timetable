FROM node:20.20.2-slim

WORKDIR /app
COPY . .

RUN yarn install --prod

CMD ["yarn", "start"]
