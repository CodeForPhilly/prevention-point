#!/bin/sh 
docker-compose exec app /bin/bash -c 'python manage.py migrate \
    && python manage.py seed \
    && echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser(\"root\", \"admin@myproject.com\", \"password\")" | python manage.py shell
'
