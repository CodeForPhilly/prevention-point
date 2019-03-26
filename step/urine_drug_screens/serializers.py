from step.models import UrineDrugScreen
from rest_framework import serializers

class UrineDrugScreenSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UrineDrugScreen
        fields = ('date_of_test', 'uds_temp', 'pregnancy_test', 'opiates', 'fentanyl', 'bup', 'coc', 'amp', 'm_amp', 'thc', 'mtd', 'pcp', 'bar', 'bzo', 'tca', 'oxy')
