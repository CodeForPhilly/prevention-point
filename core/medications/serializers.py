from rest_framework import serializers
from django.utils import timezone
from core.models import Medication


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = (
            "id",
            "visit",
            "medical_delivery",
            "medication_name",
            "ingestion_frequency",
        )

