# Sherpa Broker Test Frontend

[![Docker badge](https://badges.aleen42.com/src/docker.svg)](#) [![Generic badge](https://img.shields.io/badge/build-passing-<COLOR>.svg)](#) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](#)


This is a very basic frontend app based on React Js to test some of the endpoints

## Initialization

Add this `ENV` variable to your `Dockerfile`

```
ENV REACT_APP_API_URL https://sherpa-brokers-test-api.herokuapp.com/api/
```

There is not exposed port, add the one you prefer 

```
version: '3.2'

services:
  node:
    ports:
      - 3000:3000
      - 80:80
```

## Local Development

User Docker Compose for local development

```bash
$ docker-compose up --build
```

However you can use only Docker

```bash
$ docker build . -t sherpa-brokers-test-api
$ docker run -dp 3000:3000 sherpa-brokers-test-api
```

## Heroku Deployment

- Set the `ENV` variable described above in settings
- Connect with GitHub and publish main branch

## ToDo

- Add Tests
- Implement Swagger

## License
[MIT](https://choosealicense.com/licenses/mit/)