[![CircleCI](https://circleci.com/gh/ClinGen/clinbeacon.svg?style=svg)](https://circleci.com/gh/ClinGen/clinbeacon)

# CLEARNET Case Management Vault

The Clinbeacon repository contains two different projects, a case vault that's responsible for managing data for a tenant and processing requests from a centralized service, the hub project which is used for manaing the tenants or beacons in the system.

The projects rely on an OIDC provider for Authentication and Authorization. Azure Active Directory was used as the OIDC provider for managing users and access to the deployments.

https://apps.dev.microsoft.com

__document identity setup__

## Hub
The Hub project is responsible for performing fan-out queries across registered beacons. The hub project is also responsible for managing the tenants and beacons in the system.

## Case Vault
The Case Vault project is responsible for managing the data and performing queries for a tenant.

## sample data
The sample data directory currently contains a random collection of smaple VCF samples used for development.

## spikes
The spikes folder contains experimental projects developed more as a POC to explore various technologies and approaches.

# Reference Data

### ICD codes

- Overall description: http://www.medicalbillingandcodingonline.com/icd-cm-codes/
- ICD10: ftp://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/ICD10CM/2017/

Important files are:
- ICD10-CM: ftp://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/ICD10CM/2017/icd10cm_codes_2017.txt 
- ICD10-Addendum: ftp://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/ICD10CM/2017/icd10cm_codes_addenda_2017.txt 

- ICD9: ftp://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/ICD9-CM/2011/ 

### HPO terms

- Parent page: http://human-phenotype-ontology.github.io/ 
- HPO terms: http://compbio.charite.de/jenkins/job/hpo/1702/artifact/hp/hp.obo/*view*/ 

Will spit out some weird formatted file. Use 

- Gene names
- HGNC nomenclature.
- http://www.genenames.org/cgi-bin/download use default values and hit submit. Will spit out a tab delimited flat file of gene names. Autocomplete should use symbols in column 2 ("Approved Symbol”) of this file.

## requirements
Docker is the only developer environment requirement
* Docker 1.12 or later

## development environment
The development environment will expose the application on localhost port `:5001` and the mongodb database on localhost port `:27017`

### startup
open a terminal window in the casevault directory and type `bash up.sh`

1. the first time may take a few minutes
2. it may appear to hang at the end, after you see *Creating casevault_mongo_1*  hit the __enter__ key to get to the command prompt
3. type `npm install` to install application pip modules
4. type `npm start` to run the application

### shutdown/cleanup
shutdown and cleanup the development enviornment using `bash down.sh`  not that base images pulled by docker will remain on your system and can be cleaned up using standard docker commands `docker rmi`.

### Tooling Considerations
1. Visual Studio Code / Atom
2. MongoChef / Robomongo

## Deploy a vault
A case vault can be deployed to Microsoft Azure using the command line or the portal link below.

The Azure CLI can be used by first authenticating and selecting the account to use.
After authenticating and selecting the account or subscription to deploy the bacon to you simply need to use the `azure group create command`.
For example, from the project azure folder, `azure group create -f azuredeploy-casevault.json -l westus --name casevaultdemo`
will create a deployment in the resource group casevaultdemo in the westus data center.

The command will prompt for the admin username and SSH Key data. This can optionally be passed on the command line or through parameters file.
