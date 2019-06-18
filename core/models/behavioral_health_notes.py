from django.db import models
from django.utils import timezone
from core.models import Participant

class BehavioralHealthNotes(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    behavior_note = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
