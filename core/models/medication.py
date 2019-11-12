from django.db import models
from core.models import Visit

class Medication(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    medical_delivery = models.CharField(max_length=100)
    medication_name = models.CharField(max_length=100)
    ingestion_frequency = models.IntegerField()
