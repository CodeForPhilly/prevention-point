import json
from rest_framework import status
from rest_framework.test import APITestCase
from core.tests.base import BaseTestCase
from django.contrib.auth.models import Group, User


class UsersTests(BaseTestCase):
    fixtures=['groups.yaml', 'users.yaml']
    def setUp(self):
        super().setUp()
      

    def test_get_users_list(self):
        """
        Ensure we can create a new get all users as admin
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get( '/api/users/', follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 3)

    def test_get_user_by_id(self):
        """
        Ensure we can get a single user
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get( '/api/users/12/', follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'admin')
        self.assertNotContains(response, 'front_desk')
        self.assertNotContains(response, 'partyparty12345')

    def test_filter_users_by_params(self):
        """
        Ensure we can get a list of users by parameter search
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get( '/api/users?username=admin', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, len(response.data))
        self.assertEqual('admin', response.data[0]['username'])
        self.assertNotContains(response, 'front_desk')


    def test_users_api_when_unauthenticated(self):
        response = self.client.get('/api/users', follow=True)
        self.assertEqual(401, response.status_code)
