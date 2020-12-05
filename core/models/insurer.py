from django.db import models

class Insurer(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
