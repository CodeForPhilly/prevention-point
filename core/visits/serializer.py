from rest_framework import serializers
from core.models import Visit, UrgencyLevel
from core.participants.serializers import ParticipantSerializer
from core.services.serializers import ServiceForProgramSerializer
from core.programs.serializer import ProgramForVisitSerializer

class EnumField(serializers.Field):
    """
    custom serializer field that handles the io of enum values
    """

    def to_representation(self, value):
        return  UrgencyLevel[value].value

    def to_internal_value(self, data):
        try:
            return UrgencyLevel(data).name
        except ValueError:
            raise serializers.ValidationError(
                'Urgency Value out of range. Must be an integer between 1 and 4.'
            )


class VisitSerializer(serializers.ModelSerializer):
    urgency = EnumField()

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


class ParticipantVisitsSerializer(VisitSerializer):
    """
    Serializer for visits retrieved for a single participant.
    """
    service = ServiceForProgramSerializer(read_only=True)
    program = ProgramForVisitSerializer(read_only=True)
