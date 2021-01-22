from django.db import models
from core.models import Program
import re

class Service(models.Model):
    name = models.CharField(max_length=100)
    available = models.BooleanField(default=False)
    program = models.ForeignKey(
        Program, related_name="services", on_delete=models.CASCADE #related name replaces "service_set" for backwards nested relationships
    )
    slug = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return '%s: %s' % (self.program, self.name)

    def clean(self):
        """
        normalize slugs to lowercase, but only when first saving
        """

        # admin validation VVV
        # https://stackoverflow.com/questions/48908102/is-it-possible-to-disable-a-field-in-django-admin


        # TODO:
        # only service has slug
        #  make name unique by program here
        # automatically generate slug from program name and service name
        #  make editable false on model

        slug = re.sub(r'[^a-zA-Z0-9\-]', '', self.slug.lower())
        self.slug = '-'.join(slug.split())

        self.is_cleaned = True

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
