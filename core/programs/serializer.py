from rest_framework import serializers
from core.models import Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = (
            "id",
            "name",
            "is_closed",
        )  # backwards nested relationship uses '_set'
