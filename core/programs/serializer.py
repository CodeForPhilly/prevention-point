from rest_framework import serializers
from core.models import Program
from core.services.serializers import ServiceForProgramSerializer


class ProgramSerializer(serializers.ModelSerializer):
    services = ServiceForProgramSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        # related_name on model allows for services instead of service_set
        fields = ("id", "name", "slug", "is_closed",
                  "is_frozen", "services", "has_queue")
        extra_kwargs = {
            "slug": {"read_only": True}
        }


class ProgramForVisitSerializer(serializers.ModelSerializer):
    """
    Basic serializer for embedding programs into visits.
    """
    class Meta:
        model = Program
        fields = ("id", "name", "slug", "is_closed", "is_frozen", "has_queue")
        extra_kwargs = {
            "slug": {"read_only": True}
        }
