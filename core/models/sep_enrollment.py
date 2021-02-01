from django.db import models
from core.models import Participant, DrugsUsed
from enum import Enum

class Housing(Enum):
    PERMANENT = "permanent_housing"
    TEMPORARY = "temporarily_housed"
    SHELTER = "shelter"
    STREET = "street"
    AT_RISK = "at_risk_for_homelessness"

class SepEnrollment(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    zip_code = models.CharField(max_length=10, null=True)
    housing = [(key.value, key.value.title()) for key in Housing]
    drugs_used = models.ForeignKey(DrugsUsed, on_delete=models.CASCADE)
    in_treatment = models.BooleanField(default=False)


