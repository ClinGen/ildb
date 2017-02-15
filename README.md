[![CircleCI](https://circleci.com/gh/ClinGen/clinbeacon.svg?style=svg)](https://circleci.com/gh/ClinGen/clinbeacon)

# CLEARNET Case Management Vault and Portal

The Clinbeacon repository contains two different projects, a case vault that's responsible for managing data for a tenant and processing requests from a centralized service, the hub project which is used for manaing the tenants or beacons in the system.

The projects rely on an OIDC provider for Authentication and Authorization. Azure Active Directory was used as the OIDC provider for managing users and access to the deployments.

https://apps.dev.microsoft.com

__document identity setup__

## Hub
The [Hub Project](https://github.com/clearnet-io/queryhub) is responsible for performing fan-out queries across registered beacons. The hub project is also responsible for managing the tenants and beacons in the system.

## Case Vault
The [Case Vault Project](https://github.com/clearnet-io/casevault) is responsible for managing the data and performing queries for a tenant.

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
