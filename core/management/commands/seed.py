from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import Group

from faker import Faker
from faker.providers import BaseProvider
from core.models import Participant, Gender, Race, UrineDrugScreen,Medication,EmployeeRole,Employee,BehavioralHealthNotes
from datetime import datetime, date
import random

fake = Faker()

DEFAULT_GROUPS = ['front desk', 'case manager', 'admin']

class Command(BaseCommand):
    help = "seed database for testing and development."

    def handle(self, *args, **options):
        run_seed(self)


class MedsProvider(BaseProvider):
    __provider__ = "meds"
    __lang__ = "en_US"

    def meds(self):
        meds = [u'film', u'tab', u'vivitrol']
        return random.choices(meds)


fake.add_provider(MedsProvider)


class FrequencyProvider(BaseProvider):
    __provider__ = "frequency"
    __lang__ = "en_US"

    def frequency(self):
        frequency = [7, 14, 28, 21, 3]
        return random.choices(frequency)


fake.add_provider(FrequencyProvider)

def run_seed(self):
    call_command('migrate')
    call_command('flush')
    call_command('loaddata', 'users')
    create_groups()
    create_roles()
    create_participants()

def create_groups():
    for group in DEFAULT_GROUPS:
        Group.objects.get_or_create(name=group)
        print("Created group: {}".format(group))

def create_roles():
    for group in DEFAULT_GROUPS:
        emp_role = EmployeeRole(
                role_value=group
            )
        emp_role.full_clean()
        emp_role.save()
        create_employees(emp_role)

def create_employees(emp_role):
    for _ in range(5):
        employee = Employee(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            role = emp_role
        )
        employee.full_clean()
        employee.save()

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
        create_medication(participant)

def random_bool():
    return bool(random.getrandbits(1))

def create_medication(participant):
    meds = Medication(
        participant=participant,
        medication_name=fake.meds()[0],
        ingestion_frequency=fake.frequency()[0],
        medical_delivery=fake.sentence(nb_words=3, variable_nb_words=True, ext_word_list=None)
        )
    meds.full_clean()
    meds.save()

def create_uds_results(participant):
    for _ in range(random.randint(2,10)):
        test_date = fake.date_time_between(start_date=participant.start_date, end_date='+5y')

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



