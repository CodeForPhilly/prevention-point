import json
from django.urls import reverse
from rest_framework import status
from core.tests.base import BaseTestCase
from core.models import Site

class SiteTests(BaseTestCase):

    fixtures = [
        "site.yaml",
    ]

    # Tests: 
    # 1. Test Admin can get Site by ID
    # 2. Test Admin can get all site
    # 3. Test Admin can filter site by params
    # 4. Test unauthenticated

    # ADMIN TESTS

    def test_admin_get_site(self):
        """
        Ensure we can get all site as admin
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get('/api/sites/', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(Site.objects.count(), 4)
        self.assertEqual(len(response.data), 4)
        self.assertNotContains(response, 'random content')

    def test_admin_get_site_by_id(self):
        """
        Ensure we can get a single site as admin
        """
        headers = self.auth_headers_for_user('admin')
        site_id = Site.objects.filter(site_name='TESTING1')[0].id

        response = self.client.get('/api/sites/{}'.format(site_id), follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertContains(response, 'TESTING1')
        self.assertEqual(7, len(response.data))
        self.assertNotContains(response, 'TESTING2')
        self.assertNotContains(response, 'alskdjfuuru')

# UNAUTHENTICATED TEST

    def test_site_api_when_unauthenticated(self):
        response = self.client.get('/api/sites', follow=True)
        self.assertEqual(401, response.status_code)
