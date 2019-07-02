from rest_framework import serializers
from django.utils import timezone
from core.models import Visit
from core.services.serializers import ServiceSerializer

class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'created_at')


class VisitAndServiceAvailabilitySerializer(serializers.Serializer):
    visits = VisitSerializer(many=True)
    service_availability = ServiceSerializer(many=True)