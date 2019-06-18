from django.db import models
from django.utils import timezone

class Program(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
