import json
from rest_framework import status
from core.tests.base import BaseTestCase
from core.models import ProgramAvailability


class ProgramAvailabilityTests(BaseTestCase):
    fixtures = ['program_availability.yaml', 'programs.yaml', 'users.yaml', 'groups.yaml']

    def test_list_of_availabilities(self):
        """
        Ensure we can get a list of availabilities, only for a specific program
        """
       
        headers = self.auth_headers_for_user('internal_provider')
        response = self.client.get('/api/programs/1/program-availability/', **headers)
        content = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(ProgramAvailability.objects.filter(program_id=1)), len(content))
        
        for availability_object in content:
            self.assertEqual(availability_object['program'], 1)

    def test_update_availability(self):
        """
        Ensure we can update an availability time
        """
        headers = self.auth_headers_for_user('internal_provider')
        headers['format'] = 'json'

        data = {
          'program': 1,
          'day_of_week': 'monday',
          'start_time': '11:00:00',
          'end_time': '19:00:00',
          'id' : 1
        }
        original_start_time = ProgramAvailability.objects.get(pk=1).start_time
        original_end_time = ProgramAvailability.objects.get(pk=1).end_time
        response = self.client.put('/api/programs/1/program-availability/1/', data, **headers)
        content = json.loads(response.content)
        updated_start_time = ProgramAvailability.objects.get(pk=1).start_time
        updated_end_time = ProgramAvailability.objects.get(pk=1).end_time

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(updated_start_time.isoformat(timespec='seconds'), content['start_time'])
        self.assertEqual(updated_end_time.isoformat(timespec='seconds'), content['end_time'])
        self.assertNotEqual(original_start_time, updated_start_time)