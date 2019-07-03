from django.db import models
from django.utils import timezone
from core.models import Visit
from enum import Enum

class FrontDeskEventType(Enum):
    ARRIVED = 'arrived'
    SEEN = 'seen'
    LEFT = 'left'
    STEPPED_OUT = 'stepped_out'
    CAME_BACK = 'came_back'

class FrontDeskEvent(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    event_type = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in FrontDeskEventType]
    )
    created_at = models.DateTimeField(default=timezone.now)
