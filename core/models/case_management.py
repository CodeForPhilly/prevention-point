from django.db import models
from django.utils import timezone
from core.models import Participant

class CaseManagement(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    crs_seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
