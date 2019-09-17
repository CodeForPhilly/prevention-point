from rest_framework import serializers
from django.utils import timezone
from core.models import ProgramServiceMap
from core.services.serializers import ServiceforProgramSerializer
from core.programs.serializer import ProgramForMapSerializer

class ProgramServiceMapSerializer(serializers.ModelSerializer):
    service = ServiceforProgramSerializer(read_only=True)
    program = ProgramForMapSerializer(read_only=True)
    class Meta:
        model = ProgramServiceMap
        fields = ('program', 'service') 

