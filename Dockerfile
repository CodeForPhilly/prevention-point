FROM python:3.7

RUN pip install pipenv
COPY . /app

WORKDIR /app
RUN pipenv install --system
