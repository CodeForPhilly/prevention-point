import json
from rest_framework import status
from rest_framework.reverse import reverse
from core.tests.base import BaseTestCase
from core.models import FrontDeskEvent, FrontDeskEventType


class QueueTests(BaseTestCase):
    fixtures = ['participants.yaml', 'visits.yaml', 'groups.yaml', 'programs.yaml','program_service_map.yaml', 'services.yaml','users.yaml', 'front_desk_events.yaml']

    def test_get_queue_by_program_id(self):
        """
        Ensure we can get queue by program id
        """
        headers = self.auth_headers_for_user('case_manager')
        headers['format'] = 'json'

        # for program in range(1,4):
        program=1
        response = self.client.get(f'/api/programs/{program}/queue/', **headers)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for visit in json.loads(response.content):
          self.assertNotEqual(visit['status']['event_type'], FrontDeskEventType.SEEN.value)
          self.assertNotEqual(visit['status']['event_type'], FrontDeskEventType.LEFT.value)

    def test_participant_removed_from_queue(self):
        """
        Ensure queue gets updated
        """      
        headers = self.auth_headers_for_user('case_manager')
        headers['format'] = 'json'

        response = self.client.get('/api/programs/1/queue/', **headers)
        visit_id = json.loads(response.content)[0]['id']
        queue_length = len(json.loads(response.content))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url = reverse('frontdeskevent-list')
        data = {'visit': visit_id, 'event_type': FrontDeskEventType.SEEN.name}
        self.client.post(url, data, **headers)
        
        updated_response = self.client.get('/api/programs/1/queue/', **headers)
        updated_queue_length = len(json.loads(updated_response.content))
        self.assertEqual(updated_response.status_code, status.HTTP_200_OK)

        for visit in json.loads(updated_response.content):
            self.assertNotEqual(visit['id'], visit_id)

        self.assertEqual(queue_length, (updated_queue_length + 1))    

