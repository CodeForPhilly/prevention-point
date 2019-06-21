from rest_framework import serializers
from django.utils import timezone
from core.models import ServiceEvent
from core.models import Service
from core.services.serializers import ServiceSerializer
from core.visits.serializer import VisitSerializer 

class ServiceEventSerializer(serializers.ModelSerializer):


    class Meta:
        model = ServiceEvent
        print(model)
        fields = ('id', 'visit', 'purpose')

class ServiceEventAndAvailabilitySerializer(serializers.Serializer):
    service_events = ServiceEventSerializer(many=True)
    availability = ServiceSerializer(many=True)