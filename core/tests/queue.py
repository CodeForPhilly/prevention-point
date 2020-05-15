import json
from rest_framework import status
from rest_framework.reverse import reverse
from core.tests.base import BaseTestCase
from core.models import FrontDeskEventType


class QueueTests(BaseTestCase):
    fixtures = [
        "users.yaml",
        "groups.yaml",
        "visits.yaml",
        "programs.yaml",
        "services.yaml",
        "participants.yaml",
        "front_desk_events.yaml",
        "program_service_map.yaml",
    ]

    def test_get_queue_by_program_id(self):
        """
        Ensure we can get queue by program id
        """
        headers = self.auth_headers_for_user("internal_provider")
        headers["format"] = "json"

        # for program in range(1,4):
        program = 1
        response = self.client.get(f"/api/programs/{program}/queue/", **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for visit in json.loads(response.content):
            self.assertNotEqual(
                visit["status"]["event_type"], FrontDeskEventType.SEEN.value
            )
            self.assertNotEqual(
                visit["status"]["event_type"], FrontDeskEventType.LEFT.value
            )

    def test_participant_removed_from_queue(self):
        """
        Ensure queue gets updated
        """
        headers = self.auth_headers_for_user("internal_provider")
        headers["format"] = "json"

        response = self.client.get("/api/programs/1/queue/", **headers)
        visit_id = json.loads(response.content)[0]["id"]
        queue_length = len(json.loads(response.content))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url = reverse("frontdeskevent-list")
        data = {"visit": visit_id, "event_type": FrontDeskEventType.SEEN.name}
        self.client.post(url, data, **headers)

        updated_response = self.client.get("/api/programs/1/queue/", **headers)
        updated_queue_length = len(json.loads(updated_response.content))
        self.assertEqual(updated_response.status_code, status.HTTP_200_OK)

        for visit in json.loads(updated_response.content):
            self.assertNotEqual(visit["id"], visit_id)

        self.assertEqual(queue_length, (updated_queue_length + 1))

    def test_queue_api_when_unauthenticated(self):
        for program_id in range(1, 5):
            response = self.client.get(
                "/api/programs/{program_id}/queue".format(program_id=program_id),
                follow=True,
            )
            self.assertEqual(401, response.status_code)


class EmptyQueueTests(BaseTestCase):
    fixtures = ["participants.yaml", "groups.yaml", "programs.yaml", "users.yaml"]

    def test_get_empty_queue(self):
        """
        Ensure we can get an empty queue
        """
        headers = self.auth_headers_for_user("internal_provider")
        headers["format"] = "json"

        response = self.client.get(f"/api/programs/1/queue/", **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), [])
