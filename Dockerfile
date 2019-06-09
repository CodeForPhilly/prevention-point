FROM python:3.7

 # don't write pyc files
ENV PYTHONDONTWRITEBYTECODE 1

# prevent docker from buffering python output
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip install pipenv
COPY . /app

RUN pipenv install --system
