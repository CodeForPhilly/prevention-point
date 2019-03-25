from django.core.management.base import BaseCommand
from django.core.management import call_command
from faker import Faker
from step.models import Participant, Gender, Race, UrineDrugScreen
from datetime import datetime, date
import random

fake = Faker()

class Command(BaseCommand):
    help = "seed database for testing and development."

    def handle(self, *args, **options):
        run_seed(self)

def run_seed(self):
    call_command('migrate')
    call_command('flush')
    call_command('loaddata', 'users')
    create_participants()

def create_participants():
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
        create_uds_results(participant)

def random_bool():
    return bool(random.getrandbits(1))

def create_uds_results(participant):
    for _ in range(random.randint(2,10)):
        test_date = fake.date_between(start_date=participant.start_date, end_date='+5y')

        uds = UrineDrugScreen(
                participant=participant,
                uds_temp=random.randint(85,105),
                date_of_test=test_date,
                pregnancy_test=random_bool(),
                opiates=random_bool(),
                fentanyl=random_bool(),
                bup=random_bool(),
                coc=random_bool(),
                amp=random_bool(),
                m_amp=random_bool(),
                thc=random_bool(),
                mtd=random_bool(),
                pcp=random_bool(),
                bar=random_bool(),
                bzo=random_bool(),
                tca=random_bool(),
                oxy=random_bool(),
            )

        uds.full_clean()
        uds.save()
