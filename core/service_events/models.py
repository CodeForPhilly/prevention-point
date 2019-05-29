from django.db import models
from enum import Enum
from core.visits.models import Visit
from core.models import Participant
from core.services.models import Service
from model_utils.managers import InheritanceManager

class ServiceEventPurpose(Enum):
    ARRIVED = 'arrived'
    CALLED = 'called'
    SEEN = 'seen'
    LEFT = 'left'

class ServiceEvent(models.Model):
    objects = InheritanceManager()
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    purpose = models.CharField(
        max_length=10,
        choices=[(tag.name, tag.value) for tag in ServiceEventPurpose]
    )
