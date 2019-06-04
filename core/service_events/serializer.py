from rest_framework import serializers
from django.utils import timezone
from core.models import ServiceEvent


class ServiceEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceEvent
        fields = ('id', 'service', 'visit', 'purpose')
