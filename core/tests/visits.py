import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from core.models import Visit, ProgramServiceMap
from core.tests.base import BaseTestCase
from django.contrib.auth.models import Group, User


class VisitTests(BaseTestCase):
    fixtures = ['participants.yaml','programs.yaml','services.yaml','program_service_map.yaml']
    def setUp(self):
        super().setUp()
        self.seed_fake_users()


    def test_create_visit(self):
        """
        Ensure we can create a new visit
        """
        headers = self.auth_headers_for_user('front_desk')
        url = reverse('visit-list')
        data = {'participant': 1, 'program': 1, 'service': 1, 'notes': "hello prevention point", 'urgency': 2}
        response = self.client.post(url, data, format='json',follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(json.loads(response.content)['participant']['id'], 1)
        self.assertEqual(json.loads(response.content)['program']['id'], 1)


    def test_get_visits(self):
        """
        Ensure we can get a list of visits
        """
        url = reverse('visit-list')
        headers = self.auth_headers_for_user('case_manager')

        # create 3 visits for each participant
        for participant in range(1, 4):
            data = {'participant': participant, 'program': 1, 'service': 2, 'notes': "hello prevention point", 'urgency': 2}
            post_response = self.client.post(url, data , format='json', **headers)
            self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 3)

        # get the visits we just created
        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)

    def test_get_visit_authorization(self):
        """
        Ensure front desk cannot retrieve visits
        """
        headers = self.auth_headers_for_user('front_desk')
        url = reverse('visit-list')

        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_403_FORBIDDEN)
