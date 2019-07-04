from rest_framework import serializers
from django.utils import timezone
from core.models import Visit
from core.participants.serializers import ParticipantSerializer


class VisitSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'program_id_id', 'created_at')
