# Animal's Emergency Weekly Timetable

Weekly volunteer shifts timetable roughly designed for [Animal's Emergency association](https://www.facebook.com/canileditrezzanosn/)

## Developer notes

With temporary docker container:

```
$ docker run --rm -it -p 8125:8125 -v $PWD:/app -w /app node:20.20.2-slim bash
# yarn install
# yarn dev
```

Build and run for production:

```
$ docker build -t wtime .
$ docker run --rm -d -p 8125:8125 --name wtime wtime
```
