from django.db import models
from django.utils import timezone

from .participant import Participant

class Medication(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    medical_delivery = models.CharField(max_length=100)
    medication_name = models.CharField(max_length=100)
    ingestion_frequency = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
