import json
from rest_framework.reverse import reverse
from rest_framework import status
from core.tests import BaseTestCase
from core.models import UrineDrugScreen, Participant, ServiceEvent, ServiceEventPurpose, Service, Visit
from core.urine_drug_screens.serializers import UrineDrugScreenSerializer

class UrineDrugScreenTests(BaseTestCase):
    fixtures = ['programs.yaml', 'services.yaml', 'participants.yaml', 'visits.yaml', 'groups.yaml', 'users.yaml']

    def setUp(self):
        super().setUp()
        self.service = Service.objects.get(pk=1)
        self.visit = Visit.objects.first()

    def test_uds_endpoint(self):
        url = reverse('urinedrugscreen-list')
        data = {
            'service_event': {
                'visit': 1,
                'purpose': ServiceEventPurpose.ARRIVED.name
            },
            'uds_temp': 85,
            'date_of_test': '2019-06-10'
        }

        headers = self.auth_headers_for_user('case_manager')
        headers['format'] = 'json'
        response = self.client.post(url, data, **headers)

    def test_uds_requires_a_service_event(self):
        ser = UrineDrugScreenSerializer(data={
            'uds_temp': 85,
            'date_of_test': '2019-06-01',
        })

        self.assertEqual(False, ser.is_valid())

    def test_valid_uds_data(self):
        ser = UrineDrugScreenSerializer(data={
            'uds_temp': 90,
            'date_of_test': '2019-06-05',
            'service_event': {
                'service': self.service.id,
                'visit': self.visit.id,
                'purpose': ServiceEventPurpose.SEEN.name
            }
        })

        ser.is_valid()
        assert(ser.is_valid())
