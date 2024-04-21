FROM node:21-alpine3.18 AS sk-build
WORKDIR /usr/src/app

ARG TZ=Europe/Stockholm
ARG PUBLIC_HELLO


RUN --mount=type=secret,id=PUBLIC_SANITY_PROJECT_ID \
  --mount=type=secret,id=PUBLIC_SANITY_DATASET \
  --mount=type=secret,id=PUBLIC_BASE_URL \
  --mount=type=secret,id=GOOGLE_CLIENT_SECRET \
  --mount=type=secret,id=GOOGLE_CLIENT_ID \
  --mount=type=secret,id=FACEBOOK_CLIENT_ID \
  --mount=type=secret,id=FACEBOOK_CLIENT_SECRET \
  --mount=type=secret,id=DATABASE_URL \
  export API_ENDPOINT=$(cat /run/secrets/PUBLIC_SANITY_PROJECT_ID) && \
  export API_ENDPOINT=$(cat /run/secrets/PUBLIC_SANITY_DATASET) && \
  export API_ENDPOINT=$(cat /run/secrets/PUBLIC_BASE_URL) && \
  export API_ENDPOINT=$(cat /run/secrets/GOOGLE_CLIENT_SECRET) && \
  export API_ENDPOINT=$(cat /run/secrets/GOOGLE_CLIENT_ID) && \
  export API_ENDPOINT=$(cat /run/secrets/FACEBOOK_CLIENT_ID) && \
  export API_ENDPOINT=$(cat /run/secrets/FACEBOOK_CLIENT_SECRET) && \
  export API_PASSWORD=$(cat /run/secrets/DATABASE_URL) && \
  echo "here i am" && \
  echo $DATABASE_URL

COPY . /usr/src/app
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install -g pnpm
RUN pnpm i
RUN pnpm run build

FROM node:21-alpine3.18
WORKDIR /usr/src/app

ARG TZ=Europe/Stockholm
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml

COPY --from=sk-build /usr/src/app/build /usr/src/app/build


EXPOSE 3000
CMD ["node", "build/index.js"]