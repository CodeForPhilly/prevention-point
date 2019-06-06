import json
from django.utils.timezone import datetime
from rest_framework.reverse import reverse
from rest_framework import status
from core.tests import BaseTestCase
from core.models import UrineDrugScreen, Participant, ServiceEvent, ServiceEventPurpose, Service, Visit
from core.urine_drug_screens.serializers import UrineDrugScreenSerializer

class UrineDrugScreenTests(BaseTestCase):
    fixtures = ['programs.yaml', 'services.yaml', 'participants.yaml', 'visits.yaml', 'groups.yaml', 'users.yaml']

    def test_create_uds(self):
        uds = UrineDrugScreen()
        service = Service.objects.get(pk=1)
        visit = Visit.objects.first()
        ser = UrineDrugScreenSerializer(data={
            'uds_temp': 85,
            'date_of_test': '2019-06-01',
            'service_event': {
                'service': service.id,
                'visit': visit.id,
                'purpose': ServiceEventPurpose.SEEN.name
            }
        })

        import pdb; pdb.set_trace()

        assert(ser.is_valid())
