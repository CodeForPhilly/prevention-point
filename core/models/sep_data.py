from django.db import models
from core.models import Visit, Site
from django.utils import timezone

class Sep_Data(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    needles_in = models.IntegerField()
    needles_out = models.IntegerField()
