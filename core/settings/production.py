import os
from .common import *


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.env["DJANGO_DB_NAME"],
        'USER': os.env["DJANGO_DB_USER"],
        'HOST': os.env["DJANGO_DB_HOST"],
        'PORT': os.env["DJANGO_DB_PORT"],
    }
}
