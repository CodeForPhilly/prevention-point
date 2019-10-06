import json
from django.urls import reverse
from rest_framework import status
from core.models import Visit
from core.tests.base import BaseTestCase


class VisitTests(BaseTestCase):
    fixtures = ["participants.yaml", "programs.yaml"]

    def setUp(self):
        super().setUp()
        self.seed_fake_users()

    def test_create_visit(self):
        """
        Ensure we can create a new visit
        """
        headers = self.auth_headers_for_user("front_desk")
        url = reverse("visit-list")
        data = {"participant": 1, "program": 1}
        response = self.client.post(url, data, format="json", follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(json.loads(response.content)["participant"], 1)
        self.assertEqual(json.loads(response.content)["program"], 1)

    def test_update_visit_notes(self):
        """
        Ensure we can update notes on a visit
        """
        headers = self.auth_headers_for_user("case_manager")
        new_note = "I forgot to add notes the first time!"

        # create a visit
        data = {"participant": 1, "program": 1}
        create_response = self.client.post(
            "/api/visits/", data, format="json", **headers
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        visit_id = json.loads(create_response.content)["id"]

        data = {"notes": new_note}
        update_response = self.client.patch(
            "/api/visits/{}/".format(visit_id), data, format="json", **headers
        )

        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(Visit.objects.get(id=visit_id).notes, new_note)

    def test_get_visits(self):
        """
        Ensure we can get a list of visits
        """
        url = reverse("visit-list")
        headers = self.auth_headers_for_user("case_manager")

        # create 3 visits for each participant
        for participant in range(1, 4):
            data = {"participant": participant, "program": 1}
            post_response = self.client.post(url, data, format="json", **headers)
            self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 3)

        # get the visits we just created
        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)

    def test_get_visit_authorization(self):
        """
        Ensure front desk cannot retrieve visits
        """
        headers = self.auth_headers_for_user("front_desk")
        url = reverse("visit-list")

        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_403_FORBIDDEN)
