from rest_framework import serializers
from django.utils import timezone
from core.models import Visit
from core.participants.serializers import ParticipantSerializer
from core.program_service_map.serializer import ProgramServiceMapSerializer


class VisitSerializer(serializers.ModelSerializer):
    # program_service_map = ProgramServiceMapSerializer(read_only=True, partial=True)
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'program_service_map', 'created_at')

    # def to_representation(self, obj):
    #     """
    #     Move fields from program_service_map to visit representation.
    #     """
    #     representation = super().to_representation(obj)
    #     profile_representation = representation.pop('program_service_map')
    #     for key in profile_representation:
    #         representation[key] = profile_representation[key]
    #     return representation

    # def create(self, validated_data):
    #     print(validated_data)
    #     # service = validated_data.pop('service')
    #     # program = validated_data.pop('program')

class VisitForQueueSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'program_service_map', 'created_at')
