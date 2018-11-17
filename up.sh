#!/bin/sh

docker run --rm -dp 8081:80 -v $PWD:/www fnichol/uhttpd
