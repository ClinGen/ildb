FROM python:3.6.0

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs tmux inotify-tools && \
    npm install -g nodemon concurrently browser-sync typescript angular-cli && \
    rm -rf /var/lib/apt/lists; rm /tmp/*; apt-get autoremove -y

# This is require to allow celery to run
ENV C_FORCE_ROOT='true'
