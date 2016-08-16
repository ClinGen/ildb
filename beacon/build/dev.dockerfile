FROM python:3.5.2

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs tmux && \
    npm install -g nodemon concurrently browser-sync typescript && \
    rm -rf /var/lib/apt/lists; rm /tmp/*; apt-get autoremove -y

# This is require to allow celery to run
ENV C_FORCE_ROOT='true'
