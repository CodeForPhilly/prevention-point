from django.db import models
from django.utils import timezone


class DrugMatrix(models.Model):
    drug_name = models.CharField(
        blank=False, null=True, max_length=100, verbose_name="Name of Drug Used"
    )
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "%s" % (self.drug_name)
