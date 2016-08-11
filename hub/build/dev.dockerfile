FROM python:3.5.2

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
    apt-get install -y nodejs tmux && \
    npm install -g nodemon concurrently browser-sync typescript && \
    rm -rf /var/lib/apt/lists; rm /tmp/*; apt-get autoremove -y
