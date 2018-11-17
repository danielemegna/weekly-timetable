#!/bin/sh

docker build -t wtime .
docker stop wtime
docker run --rm -dp 8081:80 --name wtime wtime
