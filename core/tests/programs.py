from core.tests.base import BaseTestCase
from django.core.management import call_command
from core.models import Service, Program
from rest_framework import status
import random
import json

class ProgramsTests(BaseTestCase):
    fixtures = ['services.yaml', 'programs.yaml',]


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
        random_program = Program.objects.get(pk=random_pk)

        services_by_program = Service.objects.filter(program_id=random_program.id)

        route ='/api/programs/{}'.format(random_program.id)
        response = self.client.get(route , follow=True, **headers)

        response_service_ids = [
            service['id'] for service in json.loads(response.content)['services']
        ]

        self.assertTrue(
            all(service.id in response_service_ids for service in services_by_program)
        )


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

    def filter_by_queue(self):
        """
        Ensure that the data has a "has_queue" field that can be filtered.
        """
        headers = self.auth_headers_for_user('internal_provider')
        response = self.client.get( '/api/programs/', follow=True, **headers)
        content = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Program.objects.filter(pk=content["has_queue"]).exists())
        

