FROM node:21-alpine3.18 AS sk-build
WORKDIR /usr/src/app

ARG TZ=Europe/Stockholm
ARG PUBLIC_HELLO

# Set build-time environment variables
ARG PUBLIC_SANITY_PROJECT_ID=${PUBLIC_SANITY_PROJECT_ID}
ARG PUBLIC_SANITY_DATASET=${PUBLIC_SANITY_DATASET}
ARG PUBLIC_BASE_URL=${PUBLIC_BASE_URL}
ARG GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ARG GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ARG FACEBOOK_CLIENT_ID=${FACEBOOK_CLIENT_ID}
ARG FACEBOOK_CLIENT_SECRET=${FACEBOOK_CLIENT_SECRET}
ARG DATABASE_URL=${DATABASE_URL}

# Set these environment variables in the build context
ENV PUBLIC_SANITY_PROJECT_ID=${PUBLIC_SANITY_PROJECT_ID}
ENV PUBLIC_SANITY_DATASET=${PUBLIC_SANITY_DATASET}
ENV PUBLIC_BASE_URL=${PUBLIC_BASE_URL}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV FACEBOOK_CLIENT_ID=${FACEBOOK_CLIENT_ID}
ENV FACEBOOK_CLIENT_SECRET=${FACEBOOK_CLIENT_SECRET}
ENV DATABASE_URL=${DATABASE_URL}

RUN echo "hello there"
RUN echo $DATABASE_URL
RUN echo $PUBLIC_SANITY_PROJECT_ID

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