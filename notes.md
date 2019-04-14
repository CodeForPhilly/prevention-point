STEP
----
STEP offers a handful of services (about 10)

adding endpoints

CRUD/login etc. for employees

https://stackoverflow.com/questions/19365358/django-equivalent-of-rails-cancan-and-devise

sketch out the checkin endpoint
API

Waiting room context (generally walkins rather than pre-set appointments)
1) someone comes in to the PreventionPoint office for STEP service: gives name

2) receptionist looks them up by name (assume they exist)
  /step/api/participants --> list json
  /step/api/participants?name=xyz --> list json

3) person says what service they want
  /step/api/services --> list json
  /step/api/services?name=xyz --> list json

4) receptionist indicates that the person wants that service
 --> that goes into a queue that other system users (e.g. doctors)

  POST /step/api/participants/:id/services/:id --> adjust db and return confirmation
  ---> join table (appointment model?)


person might ask for more than one service
could turn into multiple appointments




assume person is in system
they are here to pick up a prescription
see a behavioural specialist
