from django.db import models
from core.models import Participant

class Appointment(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    appointment_timestamp = models.DateTimeField()
    crs_timestamp = models.DateTimeField()
    crs_seen = models.BooleanField(default=False)
    cm_timestamp = models.DateTimeField()
    cm_seen = models.BooleanField(default=False)
    hcv_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
