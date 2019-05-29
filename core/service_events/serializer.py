from rest_framework import serializers
from django.utils import timezone
from core.service_events.models import ServiceEvent


class ServiceEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceEvent
        fields = ('id', 'service', 'visit', 'purpose')
