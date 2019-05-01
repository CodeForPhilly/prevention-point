import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from core.models import ServiceEvent, ServiceEventPurpose


class ServiceEventTests(APITestCase):
    fixtures = ['participants.yaml', 'visits.yaml']

    def test_create_service_event(self):
        """
        Ensure we can create a new service event
        """
        url = reverse('serviceevent-list')
        data = {'visit': 1, 'purpose': ServiceEventPurpose.ARRIVED.name}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ServiceEvent.objects.count(), 1)
        self.assertEqual(json.loads(response.content)['visit'], 1)

    def test_get_service_events(self):
        """
        Ensure we can get a list of visits
        """
        url = reverse('serviceevent-list')

        # create 3 visits for each participant
        for visit in range(1, 6):
            post_response = self.client.post(
                url,
                {'visit': visit, 'purpose': ServiceEventPurpose.SEEN.name},
                format='json'
            )
            self.assertEqual(
                post_response.status_code, status.HTTP_201_CREATED
            )
        self.assertEqual(ServiceEvent.objects.count(), 5)

        get_response = self.client.get(url)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)

        content = json.loads(get_response.content)
        self.assertTrue(all(event['purpose'] == 'SEEN' for event in content))
