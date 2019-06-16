from django.db import models
from model_utils.managers import InheritanceManager

from core.models import Visit, ServiceEvent

class ServiceEventData(models.Model):
    objects = InheritanceManager()
    service_event =  models.OneToOneField(
        ServiceEvent,
        on_delete=models.PROTECT,
    )
