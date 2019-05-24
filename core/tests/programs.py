from core.tests.base import BaseTestCase
from django.core.management import call_command
from core.services.models import Service 
from core.programs.models import Program
from rest_framework import status
import random
import json

class ProgramsTests(BaseTestCase):
    fixtures = ['services.yaml', 'programs.yaml']
    def setUp(self):
        super().setUp()
        call_command('loaddata', 'core/fixtures/services.yaml', verbosity=0)
        call_command('loaddata', 'core/fixtures/programs.yaml', verbosity=0)
        self.seed_fake_users()