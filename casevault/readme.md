# case vault server project

## requirements
Docker is the only developer environment requirement
* Docker 1.12 or later

## development environment
The development environment will expose the application on localhost port `:5001` and the mongodb database on localhost port `:27017`

### startup
open a terminal window in the casevault directory and type `bash up.sh`

1. the first time may take a few minutes
2. it may appear to hang at the end, after you see *Creating casevault_mongo_1*  hit the __enter__ key to get to the command prompt
3. type `npm run setup` to install application pip modules
4. type `npm start` to run the application

### shutdown/cleanup
shutdown and cleanup the development enviornment using `bash down.sh`  not that base images pulled by docker will remain on your system and can be cleaned up using standard docker commands `docker rmi`.

### Tooling Considerations
1. Visual Studio Code / Atom
2. MongoChef / Robomongo

## Deploy
A case vault can be deployed to Microsoft Azure using the command line or the portal link below.

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FClinGen%2Fclinbeacon%2Fmaster%2Fazure%2Fazuredeploy-casevault.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/>
</a>

The Azure CLI can be used by first authenticating and selecting the account to use.
After authenticating and selecting the account or subscription to deploy the bacon to you simply need to use the `azure group create command`.
For example, from the project azure folder, `azure group create -f azuredeploy-casevault.json -l westus --name casevaultdemo`
will create a deployment in the resource group casevaultdemo in the westus data center.

The command will prompt for the admin username and SSH Key data. This can optionally be passed on the command line or through parameters file.

__document azure deployment__

##Using CURL with the API

###Retrieve a token using a pre-shared key (if enabled)
`TOKEN=$(curl -XPOST -k -sS --data "pre-shared-key" --header "Content-Type:text/xml" https://endpoint/api/auth/session)`

###Use the token to query a list of cases
`curl -XGET -l -sS --header "session_id:$TOKEN" https://endpoint/api/case`

###Use the token to query a list of cases
`curl -XGET -l -sS --header "session_id:$TOKEN" https://endpoint/api/case`

###Import a new case
`curl -X POST -l -d @casefile1.json --header "Content-Type:application/json" https://endpoint/api/case`

###Query the system
`curl -X POST -l -d @query.json -k --header "Content-Type:application/json" https://endpoint/api/query/hub/1`
