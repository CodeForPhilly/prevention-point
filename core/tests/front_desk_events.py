import json
from rest_framework.reverse import reverse
from rest_framework import status
from core.tests.base import BaseTestCase
from core.models import FrontDeskEvent, FrontDeskEventType


class FrontDeskEventTests(BaseTestCase):
    fixtures = [
        "users.yaml",
        "groups.yaml",
        "visits.yaml",
        "services.yaml",
        "programs.yaml",
        "participants.yaml",
        "program_service_map.yaml",
    ]

    def test_create_front_desk_event(self):
        """
        Ensure we can create a new front_desk event
        """
        url = reverse("frontdeskevent-list")
        data = {"visit": 1, "event_type": FrontDeskEventType.ARRIVED.name}
        headers = self.auth_headers_for_user("internal_provider")
        headers["format"] = "json"
        response = self.client.post(url, data, **headers)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FrontDeskEvent.objects.count(), 1)
        self.assertEqual(json.loads(response.content)["visit"], 1)

    def test_get_front_desk_events(self):
        """
        Ensure we can get a list of front_desk events
        """
        url = reverse("frontdeskevent-list")

        headers = self.auth_headers_for_user("internal_provider")
        headers["format"] = "json"

        # create 5 front_desk events for 5 visits
        for visit in range(1, 6):
            data = {"visit": visit, "event_type": FrontDeskEventType.SEEN.name}
            post_response = self.client.post(url, data, **headers)
            self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FrontDeskEvent.objects.count(), 5)
        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)

        content = json.loads(get_response.content)
        self.assertTrue(all(event["event_type"] == "SEEN" for event in content))
