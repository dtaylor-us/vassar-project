FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the backend API."
LABEL maintainer = ["derektaylor.us@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
