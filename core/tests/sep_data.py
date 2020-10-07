import json
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
from core.models import Sep_Data
from core.tests.base import BaseTestCase


class Sep_DataTestCase(BaseTestCase):
    fixtures = [
        "sep_data.yaml",
        "site.yaml",
        "participants.yaml",
        "programs.yaml",
        "services.yaml",
        "visits.yaml",
    ]

    def test_get_sep_data_admin_and_ip(self):
        """
        Ensure we can get a list of visits as admin and internal provider
        """
        header1 = self.auth_headers_for_user("admin")
        url = reverse("sep_data-list")
        res1 = self.client.get(url, format="json", follow=True, **header1)

        self.assertEqual(res1.status_code, status.HTTP_200_OK)
        self.assertEqual(Sep_Data.objects.count(), len(json.loads(res1.content)))

        header2 = self.auth_headers_for_user("internal_provider")
        url = reverse("sep_data-list")
        res2 = self.client.get(url, format="json", follow=True, **header2)

        self.assertEqual(res2.status_code, status.HTTP_200_OK)
        self.assertEqual(Sep_Data.objects.count(), len(json.loads(res2.content)))

    def test_get_sep_auth_denial_unauthorized(self):
        """
        Ensure unpermissioned users, front desk and uds provider, cannot access get all endpoint
        """
        header1 = self.auth_headers_for_user("front_desk")
        url = reverse("sep_data-list")
        res1 = self.client.get(url, format="json", follow=True, **header1)

        self.assertEqual(res1.status_code, status.HTTP_403_FORBIDDEN)

        header2 = self.auth_headers_for_user("uds_provider")
        url = reverse("sep_data-list")
        res2 = self.client.get(url, format="json", follow=True, **header2)

        self.assertEqual(res2.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_sep_data_entry(self):
        """
        Ensure we can create a new sep_data entry
        """
        headers = self.auth_headers_for_user("front_desk")
        url = reverse("sep_data-list")
        data = {
            "participant": 1,
            "visit": 5,
            "site": 3,
            "needles_in": 5,
            "needles_out": 5,
        }

        response = self.client.post(url, data, format="json", follow=True, **headers)
        content = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Sep_Data.objects.filter(pk=content["id"]).exists())

