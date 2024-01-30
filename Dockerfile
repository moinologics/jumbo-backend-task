FROM node:20-alpine as builder

WORKDIR /tmp

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /srv

COPY package*.json .

RUN npm install --only=prod

COPY --from=builder /tmp/dist dist

ENTRYPOINT [ "npm", "run", "start:prod" ]