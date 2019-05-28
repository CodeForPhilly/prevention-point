from django.db import models
from django.utils import timezone

from core.models import Participant

class Visit(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
