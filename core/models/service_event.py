from django.db import models
from model_utils.managers import InheritanceManager
from enum import Enum

from .visit import Visit
from .service import Service

class ServiceEventPurpose(Enum):
    ARRIVED = 'arrived'
    CALLED = 'called'
    SEEN = 'seen'
    LEFT = 'left'

class ServiceEvent(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.PROTECT)
    service = models.ForeignKey(Service, on_delete=models.PROTECT)
    purpose = models.CharField(
        max_length=10,
        choices=[(tag.name, tag.value) for tag in ServiceEventPurpose]
    )


class ServiceEventData(models.Model):
    objects = InheritanceManager()
    service_event =  models.OneToOneField(
        ServiceEvent,
        on_delete=models.PROTECT,
    )
