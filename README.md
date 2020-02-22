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
### Back-end
- Install [docker-compose](https://docs.docker.com/compose/install/)
- Install [pipenv](https://github.com/pypa/pipenv)
- Install dependencies
```bash
pipenv sync
```
- Activate virtualenv
```bash
pipenv shell
```
- Start the postgres database container
```bash
docker-compose up -d db
```
- Migrate the database
```bash
python manage.py migrate
```
- Seed the database:
 ```bash
python manage.py seed
```
- Create a superuser:
 ```bash
 python manage.py createsuperuser
```
- Start the app:
 ```bash
 python manage.py runserver 0.0.0.0:8000
```
- Now you can:
  - Navigate to the django admin page at localhost:8000/admin
  - Connect to the running postgres instance
 ```bash
 $ docker-compose exec db psql -U postgres
```
- Shut down the app:
```bash
$ docker-compose down
```

### Front-end
 - Make sure you have [`node (>=10.15.3)`](https://nodejs.org/en/) and [`yarn (>=1.15.2)`](https://yarnpkg.com/en/docs/install) installed
 - From the project's root directory, `cd frontend`
 - Run `yarn` to install dependencies
 - Run `yarn dev` and navigate to `localhost:1234`

 For more information on the front-end please see the [front-end README](./frontend/readme)

## Scripts
`script/server` - brings up a fully working environment
`script/setup` - Run after bootstrapping. Loads data for development and testing

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
