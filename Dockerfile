FROM python:3.7-slim

COPY . /app
WORKDIR /app

RUN pip install pipenv && pipenv install --system

ENTRYPOINT ["./django-entrypoint.sh"]