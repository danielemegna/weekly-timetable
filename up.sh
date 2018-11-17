#!/bin/sh

docker build -t wtime .
(docker rm -f wtime || true)
docker run -dp 8081:80 --name wtime wtime
