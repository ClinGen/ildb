FROM python:3.5.2

MAINTAINER fullscale180

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs tmux && \
    npm install -g gulp-cli nodemon browser-sync
