from django.db import models
from core.models import Visit, Sites
from django.utils import timezone

class Sep_Data(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    site = models.ForeignKey(Sites, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    needles_in = models.IntegerField()
    needles_out = models.IntegerField()
