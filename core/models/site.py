from django.db import models
from django.utils import timezone

class Site(models.Model):
    site_name = models.CharField(max_length=100)
    site_type = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    address = models.CharField(max_length=1000)
    zip_code = models.CharField(max_length=10)
    created_date = models.DateTimeField(default=timezone.now)