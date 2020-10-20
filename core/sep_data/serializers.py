from rest_framework import serializers
from core.models import SepData


class Sep_DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SepData
        fields = (
            "id",
            "visit",
            "site",
            "created_at",
            "needles_in",
            "needles_out",
        )
