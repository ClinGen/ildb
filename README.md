# Clinbeacon project

The Clinbeacon repository contains two different projects, a beacon or server that's responsible for managing data for a tenant and processing requests from a centralized service, the hub project which is used for manaing the tenants or beacons in the system.

The projects rely on an OIDC provider for Authentication and Authorization.  Azure Active Directory was used as the OIDC provider for managing users and access to the deployments.

https://apps.dev.microsoft.com

__document identity setup__

## Hub
The [Hub Project](https://github.com/ClinGen/clinbeacon/tree/master/hub) is responsible for performing fan-out queries across registered beacons. The hub project is also responsible for managing the tenants and beacons in the system.

## Beacon
The [Beacon Project](https://github.com/ClinGen/clinbeacon/tree/master/beacon) is responsible for managing the data and performing queries for a tenant.

## sample data
The sample data directory currently contains a random collection of smaple VCF samples used for development.

## spikes
The spikes folder contains experimental projects developed more as a POC to explore various technologies and approaches.
