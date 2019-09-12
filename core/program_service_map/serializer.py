from rest_framework import serializers
from django.utils import timezone
from core.models import ProgramServiceMap
from core.services.serializers import ServiceforProgramSerializer
from core.programs.serializer import ProgramForMapSerializer

class ProgramServiceMapSerializer(serializers.ModelSerializer):
    service = ServiceforProgramSerializer()
    program = ProgramForMapSerializer()
    class Meta:
        model = ProgramServiceMap
        fields = ('id', 'program', 'service') 

