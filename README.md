# [Prevention Point](http://ppponline.org/) [![Build Status](https://travis-ci.org/CodeForPhilly/prevention-point.svg?branch=master)](https://travis-ci.org/CodeForPhilly/prevention-point)

Prevention Point Philadelphia is a private nonprofit organization providing harm reduction services to Philadelphia and the surrounding area.

Currently, they are storing data from their programs in separate Excel spreadsheets, disparate EHRs, and partner data systems. This prevents them from being able to see all activities associated with an individual program participant, and also makes it impossible for them to do meaningful analyses that monitor program health and evaluate efforts.

## [Prevention Point Unifed Reporting System](https://codeforphilly.org/projects/prevention_point_unified_reporting_system)

This project would work to migrate all of the disparate data sources into one system, make a UI that allows Prevention Point to access all participant data in one system, and increase the ease with which program coordinators can evaluate and monitor activities.

## [Code of Conduct](https://codeforphilly.org/pages/code_of_conduct/)

This is a Code for Philly project operating under their code of conduct.

## Getting Started
### Back-end
- Install [docker-compose](https://docs.docker.com/compose/install/)
- Build the container images and migrate the database
```bash
$ docker-compose run app python /app/manage.py migrate --noinput
```
- Seed the database:
 ```bash
$ docker-compose run app python /app/manage.py seed
```
- Create a superuser:
 ```bash
 $ docker-compose run app python /app/manage.py createsuperuser
```
- Start the app:
 ```bash
 $ docker-compose up -d
```
- Now you can:
  - Navigate to the django admin page at localhost:8000/admin
  - Connect to the running postgres instance
 ```bash
 $ docker-compose exec db psql -U postgres
```

### Front-end
 - Make sure you have [`node (>=10.15.3)`](https://nodejs.org/en/) and [`yarn (>=1.15.2)`](https://yarnpkg.com/en/docs/install) installed
 - From the project's root directory, `cd frontend`
 - Run `yarn` to install dependencies
 - Run `yarn dev` and navigate to `localhost:1234`

Other tools
## Links
[Air Table](https://airtable.com/invite/l?inviteId=invl5OM0ZZXjJQhQo&inviteToken=e57abd5bb2be87cc4156a56a99097db9257ea0c11eb5d737389e71b4239979f7) to track progress

[Slack Channel](https://codeforphilly.slack.com/messages/CGHQ130MQ)
`#preventionpoint`
`#prevpoint-frontend`
`#prevpoint-backend`
`#prevpoint-pairing`

[Google Drive](https://drive.google.com/drive/folders/1wIVM8ZZOVGA8uxEuVnRTM-NaVCOS3vcn)
