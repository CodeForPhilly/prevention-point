from core.models import Participant
from rest_framework import serializers


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant

        fields = (
            "id",
            "pp_id",
            "sep_id",
            "first_name",
            "last_name",
            "last_four_ssn",
            "race",
            "gender",
            "date_of_birth",
            "start_date",
            "is_insured",
            "insurer",
            "maiden_name",
        )
