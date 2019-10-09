from django.db import models
from core.models import Program

class Service(models.Model):
    name = models.CharField(max_length=100)
    available = models.BooleanField(default=False)
