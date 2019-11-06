from django.db import models
from core.models import Visit

class CaseManagement(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    crs_seen = models.BooleanField(default=False)
