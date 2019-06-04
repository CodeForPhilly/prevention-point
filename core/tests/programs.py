from core.tests.base import BaseTestCase
from django.core.management import call_command
from core.models import Program, Service
from rest_framework import status
import random
import json

class ProgramsTests(BaseTestCase):
    fixtures = ['services.yaml', 'programs.yaml']
    def setUp(self):
        super().setUp()
        self.seed_fake_users()

    def test_get_programs_list(self):
        """
        Ensures there are the right number of programs and can GET
        """
        headers = self.auth_headers_for_user('admin')
        response = self.client.get( '/api/programs/', follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Program.objects.count(), 3)

    def test_services_populate_on_programs(self):
        """
        Ensures that all associated services populate on program objects
        """
        headers = self.auth_headers_for_user('admin')
        random_pk = random.randint(1, 3)
        random_program = Program.objects.filter(pk__exact=random_pk).values()[0]

        #get list of all services with important info
        services_list = list(Service.objects.values('program', 'name'))
        programs_services = []

        for service in services_list:
        # filter service list by program id
            if service['program'] == random_program['id']:
              programs_services.append(service)
        route ='/api/programs/{}'.format(random_program['id'])
        response = self.client.get(route , follow=True, **headers)

        for service in programs_services:
        # check that response contains substring of each service name
            self.assertContains(response, service['name'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)


