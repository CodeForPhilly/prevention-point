import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from core.models import Visit


class VisitTests(APITestCase):
    fixtures = ['participants.yaml']

    def test_create_visit(self):
        """
       Ensure we can create a new visit
        """
        url = reverse('visit-list')
        data = {'participant': 1}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(json.loads(response.content)['participant'], 1)

    def test_get_visits(self):
        """
        Ensure we can get a list of visits
        """
        url = reverse('visit-list')

        # create 3 visits for each participant
        for participant in range(1, 4):
            post_response = self.client.post(url, {'participant': participant}, format='json')
            self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 3)

        # get the visits we just created
        get_response = self.client.get(url)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
