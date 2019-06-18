from django.db import models
from django.utils import timezone
from core.models import Visit
from enum import Enum

class ServiceEventPurpose(Enum):
    ARRIVED = 'arrived'
    CALLED = 'called'
    SEEN = 'seen'
    LEFT = 'left'

class ServiceEvent(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    purpose = models.CharField(
        max_length=10,
        choices=[(tag.name, tag.value) for tag in ServiceEventPurpose]
    )
