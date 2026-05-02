## Development notes

Temporary docker start

```
$ docker run --rm -it -p 8081:80 -v $PWD:/www --name wtime fnichol/uhttpd
```

or

```
$ docker run --rm -it -p 8081:80 -v $PWD:/usr/local/apache2/htdocs/ --name wtime httpd:alpine
```

Build for production (see Dockerfile)

```
$ docker build -t wtime .
```

and run built image

```
$ docker run --rm -it -p 8081:80 --name wtime wtime
```
