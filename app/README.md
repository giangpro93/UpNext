# Development Environment Instruction

## `Install Docker`

https://docs.docker.com/engine/install/

## `Pull Docker Image`

```
docker pull giangit93/upnextdevenv
```

## `First Run`

Run from image:
```
docker run -t -d --name DESIRED_CONTAINER_NAME -p DESIRED_PORT:APP_PORT IMAGE_ID_OR_NAME
```
(In this project: APP_PORT is `3000`. Access the app using http://localhost/DESIRED_PORT.)<br />
Open terminal(s):
```
docker exec -it CONTAINER_ID_OR_NAME bin/bash
```
Stop container:
```
docker stop CONTAINER_ID_OR_NAME
```

## `After First Run`

Start old container:
```
docker start CONTAINER_ID_OR_NAME
```

## `Some docker commands`

### To list images
```
docker images (or docker image ls)
```

### To list containers
List running containers:
```
docker container ls (or docker ps)
```
List all containers:
```
docker container ls -a (or docker ps -a)
```

### Remove image
```
docker image rm IMAGE_ID_OR_NAME
```
For every images:
```
docker image rm $(docker images -q)
```

### Remove container
```
docker rm CONTAINER_ID_OR_NAME
```
For every containers:
```
docker rm $(docker ps -a)
```

### Other
```
docker inspect CONTAINER_ID_OR_NAME
docker network ls
```
