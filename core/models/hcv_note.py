from django.db import models
from core.models import Visit

class HCVNote(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    hcv_note = models.TextField()
