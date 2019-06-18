from django.db import models
from django.utils import timezone

class HCVNotes(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    hcv_note = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
