from django.db import models
from core.models import Program
import re


class Service(models.Model):
    name = models.CharField(max_length=100)
    available = models.BooleanField(default=False)
    program = models.ForeignKey(
        # related name replaces "service_set" for backwards nested relationships
        Program, related_name="services", on_delete=models.CASCADE
    )
    slug = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Concise Descriptive Identifier"
    )

    def __str__(self):
        return '%s: %s' % (self.program, self.name)

    def clean(self):
        """
        normalize slugs to lowercase, but only when first saving
        """

        if self.pk:
            self.is_cleaned = True
            return

        slug = re.sub(r'[^a-zA-Z0-9\-\s]', '', self.slug.lower())
        self.slug = '-'.join(slug.split())

        self.is_cleaned = True

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
