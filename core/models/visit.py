from django.db import models
from core.models import Participant
from core.models import ProgramServiceMap
from django.utils import timezone
from enum import Enum


class UrgencyLevel(Enum):
    _1 = 1
    _2 = 2
    _3 = 3
    _4 = 4
    _5 = 5


class Visit(models.Model):
    URGENCY_LEVEL = [(key.name, key.value) for key in UrgencyLevel]
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    program_service_map = models.ForeignKey(
        ProgramServiceMap, null=True, on_delete=models.CASCADE
    )
    notes = models.TextField("Visit Notes", null=True, blank=True)
    urgency = models.CharField(choices=URGENCY_LEVEL, max_length=20, default=UrgencyLevel._1)
