# from django.contrib.auth.models import Group, User
from core.tests.base import BaseTestCase
from django.core.management import call_command
from core.services.models import Service 
from rest_framework import status
import random
import json

def get_random_service():
    random_pk = random.randint(1, 6)
    random_service = Service.objects.filter(pk__exact=random_pk).values()[0]
    return random_service

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
        self.assertEqual(Service.objects.count(), 6)
   
    def test_update_availability(self):
        headers = self.auth_headers_for_user('admin')
        random_service = get_random_service()
        service_availability = random_service['available']
        random_service['available'] = not service_availability
        route = '/api/services/{}/'.format(random_service['id'])
        response = self.client.put(route, json.dumps(random_service), content_type='application/json', follow=True, **headers)
        updated_availabilty = Service.objects.get(pk=random_service['id']).available
        self.assertNotEqual(service_availability, updated_availabilty)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_disallow_service_name_change(self):  
        headers = self.auth_headers_for_user('admin')
        random_service = get_random_service()
        service_name = random_service['name']
        random_service['name'] = 'Some nonexistent service'
        route = '/api/services/{}/'.format(random_service['id'])
        response = self.client.put(route, json.dumps(random_service), content_type='application/json', follow=True, **headers)
        unchanged_name = Service.objects.get(pk=random_service['id']).name
        self.assertEqual(service_name, unchanged_name)