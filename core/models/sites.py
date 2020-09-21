from django.db import models
from django.utils import timezone

class Sites(models.Model):
    site_name = models.CharField(max_length=100)
    site_address = models.CharField(max_length=1000)
    site_zip = models.CharField(max_length=10)
    created_date = models.DateTimeField(default=timezone.now)