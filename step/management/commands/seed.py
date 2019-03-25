from django.core.management.base import BaseCommand
from django.core.management import call_command
from faker import Faker
from step.models import Participant, Gender, Race
from datetime import datetime
import random

class Command(BaseCommand):
    help = "seed database for testing and development."

    def handle(self, *args, **options):
        run_seed(self)

def run_seed(self):
    call_command('flush')
    call_command('loaddata', 'users')
    create_participants(self)

def create_participants(self):
    fake = Faker()

    gender_list = list(Gender)
    race_list = list(Race)

    for _ in range(10):
        last_four = fake.ssn(taxpayer_identification_number_type="SSN")[-4:]
        profile = fake.profile()
        gender = random.choice(gender_list)
        race = random.choice(race_list)

        participant = Participant(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                pp_id="todo",
                gender=gender.value,
                race=race.value,
                last_four_ssn=last_four,
                date_of_birth=profile['birthdate'],
                start_date=fake.date_time(),
            )
        participant.full_clean()
        participant.save()
