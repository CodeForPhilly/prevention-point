from django.db import models
from core.models import Visit

class BehavioralHealthNote(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    behavior_note = models.TextField()
