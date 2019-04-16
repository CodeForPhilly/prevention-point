# [Prevention Point](http://ppponline.org/)

Prevention Point Philadelphia is a private nonprofit organization providing harm reduction services to Philadelphia and the surrounding area.

Currently, they are storing data from their programs in separate Excel spreadsheets, disparate EHRs, and partner data systems. This prevents them from being able to see all activities associated with an individual program participant, and also makes it impossible for them to do meaningful analyses that monitor program health and evaluate efforts.

## [Prevention Point Unifed Reporting System](https://codeforphilly.org/projects/prevention_point_unified_reporting_system)

This project would work to migrate all of the disparate data sources into one system, make a UI that allows Prevention Point to access all participant data in one system, and increase the ease with which program coordinators can evaluate and monitor activities.

## [Code of Conduct](https://codeforphilly.org/pages/code_of_conduct/)

This is a Code for Philly project operating under their code of conduct. 

## Getting Started
Back-end 
- Install [Python 3.7](https://www.python.org/downloads/release/python-370/)
- Install [pipenv](https://github.com/pypa/pipenv), a dependency manager for Python.
- Install application dependencies:
    `$ pipenv sync`
- Source a Python virtualenv with all dependencies loaded:
    `$ pipenv shell`
- Seed the database: 
    `$ python manage.py seed`
- Create a superuser:
    `$ python manage.py createsuperuser`
- Start a local development server on localhost:8000/admin:
    `$ python manage.py runserver`

Front-end
TODO: React?

Other tools
TODO: Postman?
## Links
[Air Table](https://airtable.com/invite/l?inviteId=invl5OM0ZZXjJQhQo&inviteToken=e57abd5bb2be87cc4156a56a99097db9257ea0c11eb5d737389e71b4239979f7) to track progress

[Slack Channel](https://codeforphilly.slack.com/messages/CGHQ130MQ)
`#preventionpoint`
`#prevpoint-frontend`
`#prevpoint-backend`
`#prevpoint-pairing`

[Google Drive](https://drive.google.com/drive/folders/1wIVM8ZZOVGA8uxEuVnRTM-NaVCOS3vcn)
