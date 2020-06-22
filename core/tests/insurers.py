from rest_framework import status
from rest_framework.reverse import reverse
from core.models.insurer import Insurer
from core.tests.base import BaseTestCase


class InsurersTestCase(BaseTestCase):
    def setUp(self):
        super().setUp()

        self.insurer = Insurer.objects.create(
            name="InsureCo",
            is_active=True,
        )

    def test_create_insurer(self):
        """
        Ensure we can create a new insurer
        """
        headers = self.auth_headers_for_user("front_desk")
        url = reverse("insurer-list")
        data = {"name": "NewInsureCo", "is_active": True}
        response = self.client.post(url, data, format="json", follow=True, **headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Insurer.objects.count(), 2)

    def test_insurers_api_when_authed_as_front_desk(self):
        headers = self.auth_headers_for_user("front_desk")
        response = self.client.get("/api/insurers", follow=True, **headers)

        self.assertEqual(200, response.status_code)

    def test_insurers_api_when_unauthenticated(self):
        response = self.client.get("/api/insurers", follow=True)
        self.assertEqual(401, response.status_code)
