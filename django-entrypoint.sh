#!/bin/sh

echo "Apply database migrations"
python manage.py migrate

echo "Seed database"
python manage.py seed 

echo "Create Super User root:password"
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('root', 'admin@myproject.com', 'password')" | python manage.py shell

echo "Starting server"
python manage.py runserver 0.0.0.0:8000