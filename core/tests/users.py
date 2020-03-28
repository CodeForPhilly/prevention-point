import json
from rest_framework import status
from core.tests.base import BaseTestCase
from django.contrib.auth.models import User

class UsersTests(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.seed_fake_users()

    def test_get_users_list(self):
        """
        Ensure we can create a new get all users as admin
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get('/api/users/', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(User.objects.count(), 4)
        self.assertEqual(len(response.data), 4)

    def test_get_user_by_id(self):
        """
        Ensure we can get a single user
        """
        headers = self.auth_headers_for_user('admin')
        user_id = User.objects.filter(username='admin')[0].id

        response = self.client.get('/api/users/{}'.format(user_id), follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertContains(response, 'admin')
        self.assertNotContains(response, 'front_desk')
        self.assertNotContains(response, 'partyparty12345')

    def test_filter_users_by_params(self):
        """
        Ensure we can get a list of users by parameter search
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get('/api/users?username=admin', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, len(response.data))
        self.assertEqual('admin', response.data[0]['username'])
        self.assertNotContains(response, 'front_desk')

    def test_users_api_when_unauthenticated(self):
        response = self.client.get('/api/users', follow=True)
        self.assertEqual(401, response.status_code)

class UserPermissionsTests(BaseTestCase):
    fixtures = [
        "visits.yaml",
        "programs.yaml",
        "services.yaml",
        "participants.yaml",
        "front_desk_events.yaml",
        "program_service_map.yaml",
    ] 

    def setUp(self):
        super().setUp()
        self.seed_fake_users()

    def test_front_desk_can_access_queue(self):
        """
        ensure front desk has permission to access queue
        """
        headers = self.auth_headers_for_user('front_desk')
        
        res = self.client.get('/api/programs', follow=True, **headers)
        program_id = json.loads(res.content)[0]['id']
        response = self.client.get(f'/api/programs/{program_id}/queue', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_front_desk_cannot_access_uds_or_medication(self):
        """
        ensure front desk does not have permission to access medical type tables
        """

        headers = self.auth_headers_for_user('front_desk')

        response_1 = self.client.get('/api/uds', follow=True, **headers)
        self.assertEqual(response_1.status_code, status.HTTP_403_FORBIDDEN)
        
        response_2 = self.client.get('/api/medications', follow=True, **headers)
        self.assertEqual(response_2.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_uds_provider_cannot_access_medication(self):
        """
        ensure uds provider cannot access other types of medical data
        """

        headers = self.auth_headers_for_user('uds_provider')
       
        response = self.client.get('/api/medications', follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_uds_provider_can_access_uds(self):
        """
        ensure uds provider can access uds data
        """
        headers = self.auth_headers_for_user('uds_provider')
       
        response = self.client.get('/api/uds', follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)