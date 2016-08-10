# beacon server project

## requirements
Docker is the only developer environment requirement
* Docker 1.12.0-rc4-beta20 or later
* Docker compose 1.8.0-rc13

## development environment
The development environment will expose the application on localhost port `:5001` and the mongodb database on localhost port `:27017`

### startup
open a terminal window in the beacon directory and type `bash up.sh`

1. the first time may take a few minutes
2. it may appear to hang at the end, after you see *Creating beacon_mongo_1*  hit the __enter__ key to get to the command prompt
3. type `npm run setup` to install client npm modules and server pip modules
4. type `npm start` to start the applicatio for debug


4. type `cd ./ui && npm install && npm start &`
5. type `source dev-settings.sh` to export application environment settings for development
5. then use `python run.py&` to bring up development instance on background job

### shutdown/cleanup
shutdown and cleanup the development enviornment using `bash down.sh`  not that base images pulled by docker will remain on your system and can be cleaned up using standard docker commands `docker rmi`.

### Tooling Considerations
1. Visual Studio Code / Atom
2. MongoChef / Robomongo
