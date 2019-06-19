from rest_framework import serializers
from core.models import ServiceEvent
from core.service_events import ServiceEventSerializer

class ServiceEventDataSerializer(serializers.HyperlinkedModelSerializer):
    service_event = ServiceEventSerializer()

    def create(self, validated_data):
        events_data = validated_data.pop('service_event')
        event = ServiceEvent.objects.create(**events_data)
        validated_data.update({ 'service_event_id': event.id })
        return self.__class__.Meta.model.objects.create(**validated_data)

    def validate(self, data):
        if data.get('service_event') is None:
            raise serializers.ValidationError("must provide a service event to link data to")

        return data
