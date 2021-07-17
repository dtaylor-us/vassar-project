FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the frontend react app."
LABEL maintainer = ["derektaylor.us@gmail.com"]

WORKDIR /client/app

COPY "package.json" /client/app

RUN npm install --production

COPY . client/app

EXPOSE 3000

CMD ["npm", "start"]
