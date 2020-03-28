import json
from rest_framework import status
from rest_framework.test import APITestCase
from core.tests.base import BaseTestCase
from django.contrib.auth.models import Group, User, Permission
from core.management.commands.users_and_groups import DEFAULT_DEV_ENV_PASS


class GroupsTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.seed_fake_users()

    def test_get_groups_list(self):
        """
        Ensure we can create a new get all groups as admin
        """
        headers = self.auth_headers_for_user("admin")
        response = self.client.get("/api/groups/", follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Group.objects.count(), 4)

    def test_groups_api_when_unauthenticated(self):
        response = self.client.get("/api/groups", follow=True)
        self.assertEqual(401, response.status_code)


class GroupPermissionsTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.seed_fake_users()

    def create_new_user_and_group(self):
        """
        helper method of reusable group creation logic
        """

        external_provider = "pharmacist"

        email = "{}@{}.com".format(external_provider, external_provider)
        u = User.objects.create_user(username=external_provider, email=email)
        u.set_password(DEFAULT_DEV_ENV_PASS)
        u.save()

        group_object = Group.objects.create(name=external_provider)
        u.groups.add(group_object)

        return group_object

    def test_new_external_provider_creation(self):
        """
        ensure new group and user are created
        """

        old_group_count = Group.objects.count()
        old_user_count = User.objects.count()

        self.create_new_user_and_group()

        new_group_count = Group.objects.count()
        new_user_count = User.objects.count()

        self.assertEqual((old_group_count + 1), new_group_count)
        self.assertEqual((old_user_count + 1), new_user_count)

    def test_new_external_provider_in_correct_group(self):
        """
        ensure new user in new group
        """

        self.create_new_user_and_group()

        group = Group.objects.get(name="pharmacist")
        user = User.objects.get(username="pharmacist")

        self.assertTrue(group.pk in [group.pk for user in user.groups.all()])

    def test_un_permissioned_group_access_denied(self):
        """
        ensure new un-permissioned users/groups denied
        """

        self.create_new_user_and_group()

        headers = self.auth_headers_for_user('pharmacist')
        response_1 = self.client.get("/api/medications/", follow=True, **headers)
        self.assertEqual(response_1.status_code, status.HTTP_403_FORBIDDEN)

        response_2 = self.client.get("/api/uds/", follow=True, **headers)
        self.assertEqual(response_2.status_code, status.HTTP_403_FORBIDDEN)


    def test_new_external_provider_access(self):
        """
        ensure new users/groups have the assigned permissions
        """

        med_permission_id = Permission.objects.get(codename="view_medication").pk

        group_object = self.create_new_user_and_group()
        group_object.permissions.add(med_permission_id)

        headers = self.auth_headers_for_user("pharmacist")
        response_1 = self.client.get("/api/medications/", follow=True, **headers)
        self.assertEqual(response_1.status_code, status.HTTP_200_OK)

        response_2 = self.client.get("/api/uds/", follow=True, **headers)
        self.assertEqual(response_2.status_code, status.HTTP_403_FORBIDDEN)
