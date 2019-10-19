from rest_framework import serializers
from core.models import Visit
from core.participants.serializers import ParticipantSerializer
from core.program_service_map.serializer import ProgramServiceMapSerializer


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = (
            "id",
            "participant",
            "program_service_map",
            "created_at",
            "notes",
            "urgency",
        )


class VisitWithPopulationSerializer(serializers.ModelSerializer):
    """
    This is the visit object that is flattened and populated. intended to only
    only be for list/retrieve
    """

    program_service_map = ProgramServiceMapSerializer(read_only=True)
    participant = ParticipantSerializer(read_only=True)

    class Meta:
        model = Visit
        fields = (
            "id",
            "participant",
            "program_service_map",
            "created_at",
            "notes",
            "urgency",
        )

    def to_representation(self, obj):
        """
        flatten response object, removing program service map key and just returning its dicts, service and program
        """
        representation = super().to_representation(obj)
        try:
            profile_representation = representation.pop("program_service_map")
            for key in profile_representation:
                representation[key] = profile_representation[key]
            return representation
        except TypeError:
            # TODO the program_service_map FK needs to be required, but right now is not, hence this exception
            return representation
