FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the backend API."
LABEL maintainer = ["derektaylor.us@gmail.com"]

WORKDIR /srv/app

COPY "package.json" /srv/app
COPY "package-lock.json" /srv/app

RUN ls
RUN npm install --production
COPY . /srv/app

EXPOSE 5000

CMD ["node", "server.js"]
