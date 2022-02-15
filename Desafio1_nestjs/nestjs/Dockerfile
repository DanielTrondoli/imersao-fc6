FROM node:14.17.6-alpine3.12

LABEL maintainer="dtrondoli"

RUN npm install -g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "/home/node/app/entrypoint.sh" ]

#docker build . -t ifc_desafio_1