# Use node:21-alpine3.18 as the base image for the build stage
FROM node:21-alpine3.18 AS sk-build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Set the timezone (defaulting to Asia/Dhaka if not provided)
ARG TZ=Asia/Dhaka
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the container
COPY ./package.json /usr/src/app/package.json
COPY ./pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml

# Install dependencies using pnpm
RUN pnpm install

# Set build-time environment variables
ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET
ARG PUBLIC_BASE_URL
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG FACEBOOK_CLIENT_ID
ARG FACEBOOK_CLIENT_SECRET
ARG DATABASE_URL

# Set these environment variables in the build context
ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID
ENV PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET
ENV PUBLIC_BASE_URL=$PUBLIC_BASE_URL
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV FACEBOOK_CLIENT_ID=$FACEBOOK_CLIENT_ID
ENV FACEBOOK_CLIENT_SECRET=$FACEBOOK_CLIENT_SECRET
ENV DATABASE_URL=$DATABASE_URL

RUN echo $DATABASE_URL


# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Use node:19.7-alpine as the base image for the final runtime stage
FROM node:19.7-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Set the timezone (defaulting to Europe/Stockholm if not provided)
ARG TZ=Europe/Stockholm
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copy the built application from the sk-build stage
COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml
COPY --from=sk-build /usr/src/app/build /usr/src/app/build

# Expose port 3000
EXPOSE 3000

# Specify the command to run the application
CMD ["node", "build/index.js"]
