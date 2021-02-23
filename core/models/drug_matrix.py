from django.db import models
from enum import Enum

class Drugs(Enum):
    HEROIN = "heroin_only"
    HEROIN_COCAINE = "heroin_and_cocaine"
    COCAINE = "cocaine"
    FENTANYL = "fentanyl"
    CRACK = "crack"
    AMPHETAMINES = "amphetamines_speed_crystalMeth_ice"
    HORMONES = "hormones"
    STEROIDS = "steroids"
    SILICONE = "silicone"
    BOTOX = "botox"
    OTHER = "other"

class DrugMatrix(models.Model):
    DRUG_CHOICES = [(key.value, key.value.title()) for key in Drugs]
    drug = models.CharField(choices=DRUG_CHOICES, max_length=11, verbose_name="Drug injected most often")