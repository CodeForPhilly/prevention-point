from enum import Enum
from django.db import models
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from core.models import Program, Service, Participant


class UrgencyLevel(Enum):
    """
    the REST endpoint for a visit uses the the enum value (integer),
    while the Django ORM, Visit.objects... , uses the enum name (string)

    in tests/visits.py, and visits/serializers.py,
    `UrgencyLevel.<level>.name` and `UrgencyLevel.<level>.value` are both used,
    depending on the context
    """

    CRISIS = 4
    URGENT = 3
    BRIEF_VISIT = 2
    TIME_SENSITIVE = 1


class Visit(models.Model):
    URGENCY_LEVEL = [(key.name, key.value) for key in UrgencyLevel]
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, null=True, on_delete=models.CASCADE)
    notes = models.TextField("Visit Notes", null=True, blank=True)
    urgency = models.CharField(
        choices=URGENCY_LEVEL, max_length=20, default=UrgencyLevel.TIME_SENSITIVE.name
    )

    def __str__(self):
        return f"program: {self.program.name} visit date: {self.created_at.date()}"

    def clean(self):
        """
        if the provided program is not the related program on the service instance,
        throw an error
        """
        if self.program != self.service.program:
            raise ValidationError(
                "Service id provided does not belong to program", code=400
            )

        self.is_cleaned = True

    def save(self, *args, **kwargs):

        self.full_clean()
        super().save(*args, **kwargs)
