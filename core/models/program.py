from django.db import models
import re

class Program(models.Model):
    name = models.CharField(max_length=100)
    is_closed = models.BooleanField(default=False)
    is_frozen = models.BooleanField(default=False)
    has_queue = models.BooleanField(default=True)
    slug = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return '%s' % (self.name)

    def clean(self):
        """
        normalize slugs to kebab-case
        """
        slug = re.sub(r'[^a-zA-Z0-9\-]', '', self.slug.lower())
        self.slug = '-'.join(slug.split())

        self.is_cleaned = True

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


