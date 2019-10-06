from rest_framework import serializers
from django.utils import timezone
from core.models import Program
from core.services.serializers import ServiceforProgramSerializer


class ProgramSerializer(serializers.ModelSerializer):
    service_set = ServiceforProgramSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = (
            "id",
            "name",
            "is_closed",
            "service_set",
        )  # backwards nested relationship uses '_set'
