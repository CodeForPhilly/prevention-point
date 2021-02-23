from rest_framework import serializers
from core.models import SepEnrollment

class SepEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SepEnrollment
        fields = (
            '__all__'
        )
