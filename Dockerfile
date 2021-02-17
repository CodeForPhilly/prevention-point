FROM python:3.7-slim

ARG APP_USER=appuser
ENV DJANGO_SETTINGS_MODULE=core.settings.docker

COPY . /app
WORKDIR /app

RUN set -ex \
    && groupadd -r ${APP_USER} && useradd --no-log-init -r -g ${APP_USER} ${APP_USER} \
    && buildDeps=' \
        gcc \
        libbz2-dev \
        libc6-dev \
        libgdbm-dev \
        liblzma-dev \
        libncurses-dev \
        libreadline-dev \
        libsqlite3-dev \
        libssl-dev \
        libpcre3-dev \
        make \
        tcl-dev \
        tk-dev \
        wget \
        xz-utils \
        zlib1g-dev \
    ' \
    && apt-get update && apt-get install -y $buildDeps --no-install-recommends \
    && pip install pipenv && pip install uwsgi && pipenv install --system \
    && apt-get purge -y --auto-remove $buildDeps

RUN python manage.py collectstatic --no-input

CMD ["uwsgi", "uwsgi.ini"]