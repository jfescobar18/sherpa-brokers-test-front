FROM node:alpine

RUN mkdir -p /usr/src/

WORKDIR /usr/src/

COPY ["package.json", "package-lock.json", "/usr/src/"]

RUN npm install

COPY [".",  "/usr/src/"]

ENV REACT_APP_API_URL https://sherpa-brokers-test-api.herokuapp.com/api/

CMD ["npm", "start"]