curl -sL https://deb.nodesource.com/setup_6.x | bash -

apt install -y nodejs

ln -s "$(which nodejs)" /usr/bin/node

npm install -g gulp-cli
