from rest_framework import serializers
from django.utils import timezone
from core.models import ServiceEvent, Service
from core.services.serializers import ServiceSerializer
from core.visits.serializer import VisitSerializer 

class ServiceEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceEvent
        fields = ('id', 'visit', 'purpose')

class ServiceEventAndAvailabilitySerializer(serializers.Serializer):
    service_events = ServiceEventSerializer(many=True)
    service_availability = ServiceSerializer(many=True)