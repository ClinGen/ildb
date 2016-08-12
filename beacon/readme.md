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
3. type `npm run setup` to install application pip modules
4. type `npm start` to run the application

### shutdown/cleanup
shutdown and cleanup the development enviornment using `bash down.sh`  not that base images pulled by docker will remain on your system and can be cleaned up using standard docker commands `docker rmi`.

### Tooling Considerations
1. Visual Studio Code / Atom
2. MongoChef / Robomongo

## Deploy
A beacon can be deployed to Microsoft Azure using the command line or the portal link below.

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FClinGen%2Fclinbeacon%2Fmaster%2Fazure%2Fazuredeploy-beacon.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/>
</a>

The Azure CLI can be used by first authenticating and selecting the account to use.
After authenticating and selecting the account or subscription to deploy the bacon to you simply need to use the `azure group create command`.
For example, from the project azure folder, `azure group create -f azuredeploy-beacon.json -l westus --name beacontest7`
will create a deployment in the resource group beacontest7 in the westus data center.

The command will prompt for the admin username and SSH Key data. This can optionally be passed on the command line or through parameters file.

__document azure deployment__