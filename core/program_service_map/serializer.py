from rest_framework import serializers
from core.models import ProgramServiceMap
from core.services.serializers import ServiceSerializer
from core.programs.serializer import ProgramSerializer


class ProgramServiceMapSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    program = ProgramSerializer(read_only=True)

    class Meta:
        model = ProgramServiceMap
        fields = ("id", "program", "service")
