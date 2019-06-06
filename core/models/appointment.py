from django.db import models
from django.utils import timezone
from enum import Enum
from core.models.participant import Participant

class Appointment(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    appointment_timestamp = models.DateTimeField()
    crs_timestamp = models.DateTimeField()
    crs_seen = models.BooleanField(default=False)
    cm_timestamp = models.DateTimeField()
    cm_seen = models.BooleanField(default=False)
    hcv_status = models.BooleanField(default=False)
