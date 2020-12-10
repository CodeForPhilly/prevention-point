from rest_framework import serializers
from core.models import Program
from core.services.serializers import ServiceForProgramSerializer


class ProgramSerializer(serializers.ModelSerializer):
    services = ServiceForProgramSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = ("id", "name", "is_closed", "is_frozen", "services", "has_queue")  # related_name on model allows for services instead of service_set
