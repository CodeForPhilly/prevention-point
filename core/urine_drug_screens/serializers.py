from rest_framework import serializers

from core.models import UrineDrugScreen
from core.service_events import ServiceEventSerializer

class UrineDrugScreenSerializer(serializers.HyperlinkedModelSerializer):
    service_event = ServiceEventSerializer()

    def create(self, validated_data):
        events_data = validated_data.pop('service_event')
        return UrineDrugScreen.objects.create(**validated_data)

    class Meta:
        model = UrineDrugScreen
        fields = ('id', 'service_event', 'date_of_test', 'uds_temp', 'pregnancy_test', 'opiates', 'fentanyl', 'bup', 'coc', 'amp', 'm_amp', 'thc', 'mtd', 'pcp', 'bar', 'bzo', 'tca', 'oxy')
