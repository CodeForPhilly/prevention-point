import json
from django.urls import reverse
from rest_framework import status
from core.tests.base import BaseTestCase
from core.models import Site

class SiteTests(BaseTestCase):

    fixtures = [
        "sites.yaml",
    ]

    # Tests: 
    # 1. Test Admin can get Site by ID
    # 2. Test Admin can get all Sites
    # 3. Test Admin can filter Sites by params
    # 4. Test Front Desk can get all Sites
    # 5. Test Front Desk can get Site by ID
    # 6. Test Admin can filter Sites by params
    # 7. Test UDS can get all Sites
    # 8. Test UDS can get Site by ID
    # 9. Test Admin can filter Sites by params
    # 10. Test unauthenticated

    # ADMIN TESTS

    def test_admin_get_sites(self):
        """
        Ensure we can get all sites as admin
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get('/api/sites/', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(Site.objects.count(), 4)
        self.assertEqual(len(response.data), 4)
        self.assertNotContains(response, 'front_desk')
        self.assertNotContains(response, 'uds_provider')

    def test_admin_get_site_by_id(self):
        """
        Ensure we can get a single site as admin
        """
        headers = self.auth_headers_for_user('admin')
        site_id = Site.objects.filter(site_name='TESTING1')[0].id

        response = self.client.get('/api/sites/{}'.format(site_id), follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertContains(response, 'admin')
        self.assertNotContains(response, 'front_desk')
        self.assertNotContains(response, 'uds_provider')

    def test_admin_filter_sites_by_params(self):
        """
        Ensure we can get a list of sites by parameter search via admin
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get('/api/sites?site_type=mobile', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2, len(response.data))
        self.assertEqual('mobile', response.data[0]['site_type'])
        self.assertNotContains(response, 'front_desk')
        self.assertNotContains(response, 'uds_provider')

    # FRONT-DESK TESTS

    def test_front_desk_get_sites(self):
        """
        Ensure we can get all sites as front_desk
        """
        headers = self.auth_headers_for_user('front_desk')
        response = self.client.get('/api/sites/', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(Site.objects.count(), 4)
        self.assertEqual(len(response.data), 4)
        self.assertNotContains(response, 'admin')
        self.assertNotContains(response, 'uds_provider')

    def test_front_desk_get_site_by_id(self):
        """
        Ensure we can get a single site as front_desk
        """
        headers = self.auth_headers_for_user('front_desk')
        site_id = Site.objects.filter(site_name='TESTING1')[0].id

        response = self.client.get('/api/sites/{}'.format(site_id), follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertContains(response, 'front_desk')
        self.assertNotContains(response, 'admin')
        self.assertNotContains(response, 'uds_provider')

    def test_front_desk_filter_sites_by_params(self):
        """
        Ensure we can get a list of sites by parameter search via front_desk
        """
        headers = self.auth_headers_for_user('front_desk')
        response = self.client.get('/api/sites?site_type=mobile', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2, len(response.data))
        self.assertEqual('mobile', response.data[0]['site_type'])
        self.assertNotContains(response, 'admin')
        self.assertNotContains(response, 'uds_provider')

# UDS PROVIDER TESTS

    def test_uds_provider_get_sites(self):
        """
        Ensure we can get all sites as uds_provider
        """
        headers = self.auth_headers_for_user('uds_provider')
        response = self.client.get('/api/sites/', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(Site.objects.count(), 4)
        self.assertEqual(len(response.data), 4)
        self.assertNotContains(response, 'admin')
        self.assertNotContains(response, 'front_desk')

    def test_uds_provider_get_site_by_id(self):
        """
        Ensure we can get a single site as uds_provider
        """
        headers = self.auth_headers_for_user('uds_provider')
        site_id = Site.objects.filter(site_name='TESTING1')[0].id

        response = self.client.get('/api/sites/{}'.format(site_id), follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertContains(response, 'uds_provider')
        self.assertNotContains(response, 'admin')
        self.assertNotContains(response, 'front_desk')

    def test_uds_provider_filter_sites_by_params(self):
        """
        Ensure we can get a list of sites by parameter search via uds_provider
        """
        headers = self.auth_headers_for_user('uds_provider')
        response = self.client.get('/api/sites?site_type=mobile', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2, len(response.data))
        self.assertEqual('mobile', response.data[0]['site_type'])
        self.assertNotContains(response, 'admin')
        self.assertNotContains(response, 'front_desk')

# UNAUTHENTICATED TEST

    def test_sites_api_when_unauthenticated(self):
        response = self.client.get('/api/sites', follow=True)
        self.assertEqual(401, response.status_code)
