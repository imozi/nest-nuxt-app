ARG NODE_VERSION=lts-alpine
ARG CLIENT_PORT=3000

FROM node:$NODE_VERSION

ARG APP_PATH=''

ENV TZ=Asia/Kamchatka

WORKDIR /app

COPY $APP_PATH/entrypoint.sh .

RUN apk update && \
apk add --no-cache tzdata && \
npm i pm2 -g && \
ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
echo $TZ > /etc/timezone

EXPOSE $CLIENT_PORT

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
