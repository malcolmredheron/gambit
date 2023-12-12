# The uploader stage checks for .sentry-upload-token on the host to determine
# whether to upload to sentry, and what token to use for that. We do this
# instead of using ARG or ENV in the build file because `docker up --build`
# doesn't let us pass args or variables.

FROM node:14 AS builder
WORKDIR /gambit
COPY package.json package-lock.json /gambit/
RUN npm install
COPY tailwind.config.js tsconfig.json .babelrc.json /gambit/
# Try to copy everything other than src/server
COPY src/app /gambit/src/app
COPY src/util /gambit/src/util
COPY src/*.ts /gambit/src/

# Set up the smallest .git directory that will work for running rev-parse.
# .git/objects is required but can be empty.
COPY .git/HEAD /gambit/.git/HEAD
COPY .git/refs/heads /gambit/.git/refs/heads
RUN mkdir /gambit/.git/objects
RUN git rev-parse HEAD > /gambit/commit-info && echo "GIT_COMMIT="$(cat /gambit/commit-info) >> /gambit/.env

RUN ["npx", "parcel", "build", "--no-autoinstall", "src/app/App.html"]

FROM getsentry/sentry-cli as uploader
COPY --from=builder /gambit/dist /gambit/dist
COPY --from=builder /gambit/commit-info /gambit/commit-info
# We copy package.json so that the copy works even if .sentry-upload-token is
# missing.
COPY package.json .sentry-upload-token* /gambit/
# Upload only if .sentry-upload-token exists
RUN test ! -f /gambit/.sentry-upload-token || SENTRY_AUTH_TOKEN=$(cat /gambit/.sentry-upload-token) \
  SENTRY_PROJECT=web \
  env SENTRY_ORG=american-gambit-llc \
  /docker-entrypoint.sh releases files $(cat /gambit/commit-info) \
  upload-sourcemaps /gambit/dist

FROM nginx AS server
COPY src/server/code-prod/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /gambit/dist /gambit/dist
# So that we don't serve the source maps to users.
RUN rm /gambit/dist/*.map
