FROM node:21-alpine3.18 AS sk-build
WORKDIR /usr/src/app

ARG TZ=Europe/Stockholm
ARG PUBLIC_HELLO

ENV NODE_ENV production

COPY . /usr/src/app
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install -g pnpm
RUN pnpm i
RUN pnpm run build

FROM node:19.7-alpine
WORKDIR /usr/src/app

ARG TZ=Europe/Stockholm
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml

COPY --from=sk-build /usr/src/app/build /usr/src/app/build


EXPOSE 3000
CMD ["node", "build/index.js"]