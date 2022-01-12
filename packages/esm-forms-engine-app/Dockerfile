FROM node:16-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# Fix for host-assignment bug (enforcing 0.0.0.0 instead of default 127.0.0.1)
# COPY docker/cli.js ./node_modules/openmrs/dist
# COPY docker/debugger.js ./node_modules/openmrs/dist/utils

EXPOSE 8080
EXPOSE 8081

# Disabling entry script because it can be passed as an argument to docker run command
# CMD ["npx", "openmrs", "develop", "--backend", "https://ohri-working.globalhealthapp.net"]