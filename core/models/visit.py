from django.db import models
from core.models.participant import Participant
from core.models.program import Program
from django.utils import timezone

class Visit(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    program_id = models.ForeignKey(Program, on_delete=models.CASCADE)
    notes = models.TextField("Visit Notes", null= True, blank=True)



