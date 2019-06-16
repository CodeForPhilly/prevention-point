from core.models import UrineDrugScreen
from core.service_event_data import ServiceEventDataSerializer

class UrineDrugScreenSerializer(ServiceEventDataSerializer):

    class Meta:
        model = UrineDrugScreen
        fields = ('id', 'service_event', 'date_of_test', 'uds_temp', 'pregnancy_test', 'opiates', 'fentanyl', 'bup', 'coc', 'amp', 'm_amp', 'thc', 'mtd', 'pcp', 'bar', 'bzo', 'tca', 'oxy')
