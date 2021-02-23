from rest_framework import serializers
from core.models import DrugMatrix

class DrugMatrixSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugMatrix
        fields = (
            "drug",
        )
