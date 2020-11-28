from django.db import models
from core.models import Program


class Service(models.Model):
    name = models.CharField(max_length=100)
    available = models.BooleanField(default=False)
    program = models.ForeignKey(
        Program, related_name="services", on_delete=models.CASCADE
    ) #related name replaces "service_set" fro backwards nested relationships

    def __str__(self):
        return '%s: %s' % (self.program, self.name)