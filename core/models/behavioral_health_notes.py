from django.db import models
from core.models import Visit

class BehavioralHealthNotes(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    behavior_note = models.TextField()

# TODO delete me
# You are trying to add a non-nullable field 'visit' to behavioralhealthnotes without a default; we can't do that (the database needs something to populate existing rows).
# Please select a fix:
#  1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
#  2) Quit, and let me add a default in models.py
