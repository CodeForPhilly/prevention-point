import json
from rest_framework.reverse import reverse
from rest_framework import status
from core.tests.base import BaseTestCase
from core.models import ProgramServiceMap, Service


class ProgramServiceMapTests(BaseTestCase):
    fixtures = ['users.yaml', 'groups.yaml','services.yaml', 'programs.yaml','program_service_map.yaml']

    def test_map_objects_have_expected_pairs(self):
      """
      ensure that services and programs are paired correctly
      """
      headers = self.auth_headers_for_user('admin')
      for map_id in range(1, 44):
        map_object = ProgramServiceMap.objects.get(pk=map_id)
        response = self.client.get('/api/program-service-map/{}/'.format(map_id), follow=True, **headers)
        program_id = json.loads(response.content)['program']['id']
        service_id = json.loads(response.content)['service']['id']
        self.assertEqual(program_id, map_object.program_id)
        self.assertEqual(service_id, map_object.service_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

   
    def test_service_on_map_object_present_on_program_route(self):
      """
      ensure that services on programs are populated
      """
      headers = self.auth_headers_for_user('admin')
      for map_id in range(1, 44):
        map_object = ProgramServiceMap.objects.get(pk=map_id)
        service_name = Service.objects.get(pk=map_object.service_id).name
        response = self.client.get('/api/programs/{}/'.format(map_object.program_id), follow=True, **headers)
        self.assertContains(response, service_name)
     


