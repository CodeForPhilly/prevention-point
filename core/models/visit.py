from django.db import models
from core.models.participant import Participant
from core.models.program_service_map import ProgramServiceMap
from django.utils import timezone
from enum import Enum


class UrgencyLevel(Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5


class Visit(models.Model):
    URGENCY_LEVEL = [(key.name, key.value) for key in UrgencyLevel]
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    program_service_map = models.ForeignKey(
        ProgramServiceMap, null=True, on_delete=models.CASCADE
    )
    notes = models.TextField("Visit Notes", null=True, blank=True)
    urgency = models.CharField(choices=URGENCY_LEVEL, max_length=20, default=1)
