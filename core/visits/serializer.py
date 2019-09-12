from rest_framework import serializers
from django.utils import timezone
from core.models import Visit
from core.participants.serializers import ParticipantSerializer
from core.program_service_map.serializer import ProgramServiceMapSerializer


class VisitSerializer(serializers.ModelSerializer):
    program_service_map = ProgramServiceMapSerializer()
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'program_service_map', 'created_at')


class VisitForQueueSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'program_service_map', 'created_at')
