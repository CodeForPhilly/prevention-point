import json
from django.urls import reverse
from rest_framework import status
from core.tests.base import BaseTestCase
from core.models import ServiceEvent, ServiceEventPurpose


class ServiceEventTests(BaseTestCase):
    fixtures = ['participants.yaml', 'visits.yaml', 'groups.yaml', 'users.yaml']

    def test_create_service_event(self):
        """
        Ensure we can create a new service event
        """
        url = reverse('serviceevent-list')
        data = {'visit': 1, 'purpose': ServiceEventPurpose.ARRIVED.name}
        headers = self.auth_headers_for_user('case_manager')
        headers['format'] = 'json'
        response = self.client.post(url, data, **headers)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ServiceEvent.objects.count(), 1)
        self.assertEqual(json.loads(response.content)['visit'], 1)

    def test_get_service_events(self):
        """
        Ensure we can get a list of service events
        """
        url = reverse('serviceevent-list')

        headers = self.auth_headers_for_user('case_manager')
        headers['format'] = 'json'

# create 5 service events for 5 visits
        for visit in range(1, 6):
            data = {'visit': visit, 'purpose': ServiceEventPurpose.SEEN.name}
            post_response = self.client.post(url, data, **headers)
            self.assertEqual(
                post_response.status_code, status.HTTP_201_CREATED
            )
        self.assertEqual(ServiceEvent.objects.count(), 5)

        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)

        content = json.loads(get_response.content)
        self.assertTrue(all(event['purpose'] == 'SEEN' for event in content))
