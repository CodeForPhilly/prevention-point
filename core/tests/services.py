# from django.contrib.auth.models import Group, User
from core.tests.base import BaseTestCase
from django.core.management import call_command
from core.services.models import Service 
from rest_framework import status

class ServicesTests(BaseTestCase):
    fixtures = ['services.yaml', 'programs.yaml']
    def setUp(self):
        super().setUp()
        call_command('loaddata', 'core/fixtures/services.yaml', verbosity=0)
        call_command('loaddata', 'core/fixtures/programs.yaml', verbosity=0)

        self.seed_fake_users()

    def test_get_services_list(self):
        headers = self.auth_headers_for_user('admin')
        response = self.client.get( '/api/services/', follow=True, **headers)
      
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Service.objects.count(), 3)
   
    def test_update_availability(self):
        headers = self.auth_headers_for_user('admin')


    def test_disallow_service_name_change(self):  