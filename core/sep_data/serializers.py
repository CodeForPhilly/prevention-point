from rest_framework import serializers
from core.models import Sep_Data


class Sep_DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sep_Data
        fields = (
            "id",
            "visit",
            "site",
            "created_at",
            "needles_in",
            "needles_out",
        )
