# Docker-cheatsheet

## Installing docker in Linux

Installing docker is not a hard thing to do.
We will be using only Ubuntu 20.04 for this cheatsheet. However you can modify the commands to suit your desired distro of linux.

First, delete all versions of docker (if you have ...)

```
 sudo apt-get remove docker docker-engine docker.io containerd runc
```

Set up repository next :

````
 $ sudo apt-get update
 $ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    ```
````

Actually you know what ... I'll provide the link which you can follow.
https://docs.docker.com/engine/install/ubuntu/

### Pulling an image from repository :

---

Pulling an image is almost same as pulling an instance of an OS (or something very closely related to it). It just gives you a minimalistic OS to do things. If something works in one docker instance, it will work in another !

It is very convenient as you don't have to deal with system dependency, or any other architecture based issues.

To pull an image from a repository, it is as simple as just :

`docker pull imagename`

or just go to docker hub, and then follow the instructions.

### Docker commands

---

- `docker images`

  This gives you a list of all the images available in your system.

- `docker ps` or `docker container ls`:

  This lists the currently running containers in your system.<br/>
  If you want to get all the containers, currently running/closed containers, you may want to use a flag `-a`<br/>
  `docker ps -a`

- `docker run '<repository>:<tag>` or <br/>`docker run <closed_container_name>` or <br/>
  `docker run <closed_container_id>`

  The first command is generally used to create an instance of an image (basically a container). If you want to re-run a previously closed container, the last two commands are used.

  Now these commands will run in attached mode. To run them in detached mode, a flag `-d` is needed.
  It is as simple as `docker run '<repository>:<tag>`. MOst of the times, you will prefer this approach.

  Next, a container might expose a port(s) of it's own. Now intuitively, we can't access these port(s) in our local machine. The solution to this is pretty simple. We map one of our local ports to the exposed port. Voila, there we go!<br/>
  `docker run -d -p 8080:80 nginx:latest`<br/>
  Here, 8080 of our machine is mapped to port 80 of the image container nginx:latest.<br/>
  We can also expose multiple ports.<br/>
  `docker run -d -p 8080:80 -p 3000:80 -p 2000:3000 nginx:latest`<br/>

- `docker stop <running_container_name`: <br/> This is for deleting a running_container.

- `docker rm <tagId>`: <br/>
  This will remove a container with a given tagID. Note: Running containers cannot be removed normally, but can be force removed with `-f` flag.
