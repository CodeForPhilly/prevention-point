from django.db import models
from django.utils import timezone
from enum import Enum
from core.models.participant import Participant

class Medication(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    medical_delivery = models.CharField(max_length=100)
    medication_name = models.CharField(max_length=100)
    ingestion_frequency = models.IntegerField()

class CaseManagement(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    crs_seen = models.BooleanField(default=False)

class Appointment(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)

    cm_employee = models.ForeignKey(
            Employee, related_name='cm_%(class)s', on_delete=models.CASCADE
            )

    crs_employee = models.ForeignKey(
            Employee, related_name='crs_%(class)s', on_delete=models.CASCADE
            )

    appointment_timestamp = models.DateTimeField()
    crs_timestamp = models.DateTimeField()
    crs_seen = models.BooleanField(default=False)
    cm_timestamp = models.DateTimeField()
    cm_seen = models.BooleanField(default=False)
    hcv_status = models.BooleanField(default=False)

# TODO: we probably want to move the HCV data into its own table(s), similar to how UDS works
class BehavioralHealthNotes(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    behavior_note = models.TextField()

class HCVNotes(models.Model):
    participant = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    hcv_note = models.TextField()

