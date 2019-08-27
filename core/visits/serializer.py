from rest_framework import serializers
from django.utils import timezone
from core.models import Visit
from core.participants.serializers import ParticipantSerializer


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'program', 'created_at')

class VisitForQueueSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'program', 'created_at')
