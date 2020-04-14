# [Prevention Point](http://ppponline.org/) [![Build Status](https://travis-ci.org/CodeForPhilly/prevention-point.svg?branch=master)](https://travis-ci.org/CodeForPhilly/prevention-point)

Prevention Point Philadelphia is a private nonprofit organization providing harm reduction services to Philadelphia and the surrounding area.

Currently, they are storing data from their programs in separate Excel spreadsheets, disparate EHRs, and partner data systems. This prevents them from being able to see all activities associated with an individual program participant, and also makes it impossible for them to do meaningful analyses that monitor program health and evaluate efforts.

## [Prevention Point Unifed Reporting System](https://codeforphilly.org/projects/prevention_point_unified_reporting_system)

This project would work to migrate all of the disparate data sources into one system, make a UI that allows Prevention Point to access all participant data in one system, and increase the ease with which program coordinators can evaluate and monitor activities.

## Before Contributing:

* Read through the [Wiki](https://github.com/CodeForPhilly/prevention-point/wiki).
* Familiarize yourself with the agreed upon project [change management practices](https://github.com/CodeForPhilly/prevention-point/wiki/Change-Management-Practices).

## [Code of Conduct](https://codeforphilly.org/pages/code_of_conduct/)

This is a Code for Philly project operating under their code of conduct.

## Getting Started
- Install [docker-compose](https://docs.docker.com/compose/install/)

### Scripts

This project implements the [Scripts To Rule Them All](https://github.com/github/scripts-to-rule-them-all) interface for developers:

**Starting Locally**
1. `script/server` — Brings a fully working environment up at [localhost:8080](http://localhost:8080)
2. `script/setup` — Run after `script/server` to initialize local database with seed data

**Updating Running Version**
* `script/update` — Run after changing code or switching branches to refresh server

Other tools
## Links
[Wiki](https://github.com/CodeForPhilly/prevention-point/wiki)

[Milestones](https://github.com/CodeForPhilly/prevention-point/milestones)

[MVP Tracker](https://github.com/CodeForPhilly/prevention-point/projects/1)

[Slack Channel](https://codeforphilly.slack.com/messages/CGHQ130MQ)
`#preventionpoint`
`#prevpoint-frontend`
`#prevpoint-backend`
`#prevpoint-pairing`

[Google Drive](https://drive.google.com/drive/folders/1wIVM8ZZOVGA8uxEuVnRTM-NaVCOS3vcn)
