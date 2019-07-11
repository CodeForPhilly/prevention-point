from rest_framework import serializers
from core.models import FrontDeskEvent


class FrontDeskEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontDeskEvent
        fields = ('id', 'visit', 'event_type', 'created_at')

class FrontDeskEventForQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontDeskEvent
        fields = ('id', 'event_type', 'created_at')

