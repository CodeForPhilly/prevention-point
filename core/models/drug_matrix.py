from django.db import models
from django.utils import timezone

class DrugMatrix(models.Model):
    drug_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '%s' % (self.drug_name) 