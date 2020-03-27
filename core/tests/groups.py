import json
from rest_framework import status
from rest_framework.test import APITestCase
from core.tests.base import BaseTestCase
from django.contrib.auth.models import Group, User


class GroupsTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.seed_fake_users()

    def test_get_groups_list(self):
        """
        Ensure we can create a new get all users as admin
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get( '/api/groups/', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Group.objects.count(), 4)

    def test_groups_api_when_unauthenticated(self):
        response = self.client.get('/api/groups', follow=True)
        self.assertEqual(401, response.status_code)
    