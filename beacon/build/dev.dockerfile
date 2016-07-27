FROM python:3.5.1

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs tmux && \
    npm install -g gulp-cli nodemon && \
    curl -sSL -O https://get.docker.com/builds/Linux/x86_64/docker-1.11.2.tgz && \
    tar zxf docker-1.11.2.tgz -C / && \
    rm docker-1.11.2.tgz && \
    ln -s /docker/docker /usr/local/bin/docker && \
    rm -rf /var/lib/apt/lists; rm /tmp/*; apt-get autoremove -y
