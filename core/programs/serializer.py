from rest_framework import serializers
from django.utils import timezone
from core.programs.models import Program
from core.services.serializers import ServiceSerializer

class ProgramSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = ('id', 'name', 'services')
