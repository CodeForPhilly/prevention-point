# Prevention Point 
http://ppponline.org/
Prevention Point Philadelphia is a private nonprofit organization providing harm reduction services to Philadelphia and the surrounding area.

Currently, they are storing data from their programs in separate Excel spreadsheets, disparate EHRs, and partner data systems. This prevents them from being able to see all activities associated with an individual program participant, and also makes it impossible for them to do meaningful analyses that monitor program health and evaluate efforts.

# Prevention Point Unifed Reporting System 
https://codeforphilly.org/projects/prevention_point_unified_reporting_system

This project would work to migrate all of the disparate data sources into one system, make a UI that allows Prevention Point to access all participant data in one system, and increase the ease with which program coordinators can evaluate and monitor activities.

## Getting Started

- Install Python 3.7
- Install [pipenv](https://github.com/pypa/pipenv), a dependency manager for Python.
- Install application dependencies:
    `$ pipenv sync`
- Source a Python virtualenv with all dependencies loaded:
    `$ pipenv shell`
- Start a local development server:
    `$ python manage.py startserver`
