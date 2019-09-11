from django.db import models
from core.models.participant import Participant
from core.models.program_service_map import ProgramServiceMap
from django.utils import timezone

class Visit(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    program_service_map = models.ForeignKey( ProgramServiceMap, null=True, on_delete=models.CASCADE)
    notes = models.TextField("Visit Notes", null= True, blank=True)



