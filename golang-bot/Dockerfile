#stageI (Build Binary)
FROM golang:1.17.3-alpine3.14 AS builder
WORKDIR /app
COPY ./ ./
RUN go mod download
RUN go build -o main

#stageII
FROM alpine:3.14
WORKDIR /app
COPY --from=builder /app/main .
COPY .env /app/
EXPOSE 10015
CMD [ "./main" ]