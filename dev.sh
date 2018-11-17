#!/bin/sh

docker run --rm -ip 80:80 -v $PWD:/www fnichol/uhttpd
