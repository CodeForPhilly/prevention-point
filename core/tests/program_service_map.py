import json
from rest_framework.reverse import reverse
from rest_framework import status
from core.tests.base import BaseTestCase
from core.models import ProgramServiceMap, Service


class ProgramServiceMapTests(BaseTestCase):
    fixtures = ['users.yaml', 'groups.yaml','services.yaml', 'programs.yaml','program_service_map.yaml']

    def test_map_objects_have_correct_services(self):
      """
      ensure that services and programs are paired correctly
      """
      headers = self.auth_headers_for_user('admin')
      for map_id in range(1, 44):
        response = self.client.get('/api/program-service-map/{}/'.format(map_id), follow=True, **headers)
        service_id = json.loads(response.content)['service']['id']
        program_id = Service.objects.get(pk=service_id).program_id
        self.assertEqual(json.loads(response.content)['program']['id'], program_id)