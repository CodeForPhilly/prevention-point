from django.db import models
from core.models import Participant
from django.utils import timezone

class Visit(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
