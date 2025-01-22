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

RUN if [ "$APP_PATH" = "./backend" ]; then \
        apk --no-cache add --virtual builds-deps build-base python3 && \
        npm i -g @nestjs/cli; \
    fi

EXPOSE $CLIENT_PORT

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
