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

`$ docker pull imagename`

or just go to docker hub, and then follow the instructions.

## **Docker commands**

- `$ docker images`

  This gives you a list of all the images available in your system.

- `$ docker ps` or `$ docker container ls`:

  This lists the currently running containers in your system.<br/>
  If you want to get all the containers, currently running/closed containers, you may want to use a flag `-a`<br/>
  `$ docker ps -a`

- `$ docker run '<repository>:<tag>` or <br/>
  `$ docker start <closed_container_name>` or <br/>
  `$ docker start <closed_container_id>`

  The first command is generally used to create an instance of an image (basically a container). If you want to re-run a previously closed container, the last two commands are used.

  Now these commands will run in attached mode. To run them in detached mode, a flag `-d` is needed.
  It is as simple as `$ docker run '<repository>:<tag>`. MOst of the times, you will prefer this approach.

  Next, a container might expose a port(s) of it's own. Now intuitively, we can't access these port(s) in our local machine. The solution to this is pretty simple. We map one of our local ports to the exposed port. Voila, there we go!<br/>
  `$ docker run -d -p 8080:80 nginx:latest`<br/>
  Here, 8080 of our machine is mapped to port 80 of the image container nginx:latest.<br/>
  We can also expose multiple ports.<br/>
  `$ docker run -d -p 8080:80 -p 3000:80 -p 2000:3000 nginx:latest`<br/>

  We can give custom name to our containers by using `--name` flag.<br/>
  `$ docker run --name someName -d -p 8080:80 -p 3000:80 -p 2000:3000 nginx:latest`

- `$ docker stop <running_container_name>`: <br/> This is for deleting a running_container.

- `$ docker rm <tagId>`: <br/>
  This will remove a container with a given tagID. Note: Running containers cannot be removed normally, but can be force removed with `-f` flag. <br/>
  To delete every single container, we can do something like - <br/>`$ docker rm $(docker ps -aq)`

## **Volumes**

---

Now there's no point of containers if we can't have files/directories in it. Thus we have the concept of Volumes in docker. We can share data between containers as well between containers and local machine.

To share our files/directories with the container or vice-versa, we need to map them. It is also important to provide read/write permission while doing so. Let's see how we can do so.

**Between Host and Container**

`$ docker run -v $(pwd):<path_in_container>:<read/write_perms> -d <repo_name>`

Suppose we want to use the terminal inside container, we just need to run :<br/>
`$ docker exec -it <container_name> bash`  
`-it` is for interactive mode.

If you want read only file mode, then you can use smt. like:  
`$ docker run -v $(pwd):<path_in_container>:ro -d <repo_name>`  
If not, then  
`$ docker run -v $(pwd):<path_in_container> -d <repo_name>`

**Between Containers**  
Sometimes, it is necessary to have multiple containers sharing some data. Thus, there is a need of having a shared memory space for communication between containers. We can just do so by :  
``$ docker run --volumes-from <name_of_container_to_be_shared> -d <repo_name>`

<br/>

## **Dockerfile**

---

Till now we have been using a docker image pulled from an existing repository. What if we need to make one of our own? A dockerfile helps us to create an image which in turn can be run as a container!

**Build your own image**
An image is a template for creating an environment of your choice. It's like a snapshot of your environment which has everything to run your app!

The steps to create your own docker file is as follows :

1.  Create a file name `Dockerfile` in your existing app directory
2.  Next, we need to set a base image. Maybe nginx. We won't usually be building a dockerfile from scratch, so it is necessary to have a base image.  
    Thus, we need to write `FROM <nginx:latest>`
3.  We need to add all directories or files to some destination inside the container. For example, to serve static content in nginx, we put static content in /usr/share/nginx/html. So to do that, we will be doing :  
    `ADD . /usr/share/nginx/html
4.  Type `docker build --tag <name_of_image>:<tag> .` in the terminal.

For an example, you can refer to the Dockerfile in the repo. [Dockerfile](Dockerfile)

Now to build it, in the working directory we just need to do  
`docker build -t test-api:latest .`

`WORKDIR` in Dockerfile basically means that the current working directory inside the container is `/app`. If it's not found, then docker creates one in the container.

<br/>

Now you know that we don't need to include node_modules in our docker image because it is going to be created anyway while running `npm install`. We also don't need `Dockerfile` inside docker image. We should also exclude `.git`.

**Docker Inspect**
You can inspect docker by `docker inspect <id>`. This is very useful at times, and you may want to refer to it time to time. For example, for getting inside terminal of a container, you may want to inspect the docker and search for `CMD` in docker inspect.
