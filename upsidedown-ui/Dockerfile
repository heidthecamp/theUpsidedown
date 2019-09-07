FROM node:11.13.0-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:11.13.0-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 5000
CMD ["serve", "-p", "5000", "-s", "."]
