from rest_framework import serializers
from core.models import Visit
from core.participants.serializers import ParticipantSerializer
from core.services.serializers import ServiceForProgramSerializer

class VisitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Visit
        fields = (
            "id",
            "notes",
            "service",
            "program",
            "urgency",
            "created_at",
            "participant",
        )

class PopulatedVisitSerializer(VisitSerializer):
    participant = ParticipantSerializer(read_only=True)
    service = ServiceForProgramSerializer(read_only=True) # TODO, remove this and get service data from queues[i].services[i].id on the front end
