from django.db import models

class HCVNotes(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    hcv_note = models.TextField()
