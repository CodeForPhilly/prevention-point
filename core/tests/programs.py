from core.tests.base import BaseTestCase
from django.core.management import call_command
from core.models import Service, Program, ProgramServiceMap
from rest_framework import status
import random
import json

class ProgramsTests(BaseTestCase):
    fixtures = ['services.yaml', 'programs.yaml', 'program_service_map.yaml']
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
        self.assertEqual(Program.objects.count(), 9)

    def test_services_populate_on_programs(self):
        """
        Ensures that all associated services populate on program objects
        """
        headers = self.auth_headers_for_user('admin')
        random_pk = random.randint(1, 9)
        random_program = Program.objects.filter(pk__exact=random_pk).values()[0]

        #get list of all services with important info
        program_service_ids = list(ProgramServiceMap.objects.values())
        services = []

        for program_service_pair in program_service_ids:
        # filter service list by program id
            if program_service_pair['program_id'] == random_program['id']:
                service_name = Service.objects.get(pk=program_service_pair['service_id']).name  
                services.append(service_name)
        route ='/api/programs/{}'.format(random_program['id'])
        response = self.client.get(route , follow=True, **headers)

        for service in services:
        # check that response contains substring of each service name
            self.assertContains(response, service)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_is_closed_is_updated(self):
        """
        Ensures that a case manager can update the is_closed property
        """
        headers = self.auth_headers_for_user('internal_provider')
        random_pk = random.randint(1, 3)
        random_program = Program.objects.filter(
            pk__exact=random_pk
        ).values()[0]
        self.assertFalse(random_program['is_closed'])

        # update the program
        data = {'is_closed': True}
        response = self.client.patch(
            '/api/programs/{}/'.format(random_program['id']),
            data, format='json',follow=True, **headers
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check that the program is marked as closed in the database
        updated_program = Program.objects.filter(
            pk__exact=random_program['id']
        ).values()[0]

        self.assertTrue(updated_program['is_closed'])

    def test_is_frozen_is_updated(self):
        """
        Ensures that a case manager can update the is_frozen property
        """
        headers = self.auth_headers_for_user('internal_provider')
        random_pk = random.randint(1, 3)
        random_program = Program.objects.filter(
            pk__exact=random_pk
        ).values()[0]
        self.assertFalse(random_program['is_frozen'])

        # update the program
        data = {'is_frozen': True}
        response = self.client.patch(
            '/api/programs/{}/'.format(random_program['id']),
            data, format='json',follow=True, **headers
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check that the program is marked as closed in the database
        updated_program = Program.objects.filter(
            pk__exact=random_program['id']
        ).values()[0]

        self.assertTrue(updated_program['is_frozen'])
