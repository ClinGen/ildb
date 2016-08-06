FROM ubuntu:16.04

MAINTAINER fullscale180

RUN apt-get update && \
    apt-get install -y curl nodejs npm tmux build-essential && \
    ln -s "$(which nodejs)" /usr/bin/node && \
    npm install -g gulp-cli nodemon browser-sync && \
    curl -sSL -O https://get.docker.com/builds/Linux/x86_64/docker-1.12.0.tgz && \
    tar zxf docker-1.12.0.tgz -C / && \
    rm docker-1.12.0.tgz && \
    ln -s /docker/docker /usr/local/bin/docker && \
    rm -rf /var/lib/apt/lists; rm /tmp/*; apt-get autoremove -y
