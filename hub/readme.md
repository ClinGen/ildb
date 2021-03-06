# ILDB hub project

## requirements
Docker is the only developer environment requirement
* Docker 1.12 or later

## development environment
The development environment will expose the application on localhost port `:5051` and the mongodb database on localhost port `:27017`

### startup
open a terminal window in the hub directory and type `bash up.sh`

1. the first time may take a few minutes
2. it may appear to hang at the end, after you see *Creating clearnethub_mongo_1*  hit the __enter__ key to get to the command prompt
3. type `npm run setup` to install application pip modules
4. type `npm start` to run the application

### shutdown/cleanup
shutdown and cleanup the development enviornment using `bash down.sh`  not that base images pulled by docker will remain on your system and can be cleaned up using standard docker commands `docker rmi`.

### Tooling Considerations
1. Visual Studio Code / Atom
2. MongoChef / Robomongo
