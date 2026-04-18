# TBC

# Dev

```
$ docker run --rm -it -p 8125:8125 -v $PWD:/app -w /app node:lts bash
# yarn install
# yarn dev
```

# Prod
```
$ docker run --rm -it -p 8125:8125 -v $PWD:/app -w /app node:lts bash
# yarn install
# yarn tsc
# yarn install --prod
# yarn start
```
