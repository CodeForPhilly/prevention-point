from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import Group, User

from faker import Faker
from faker.providers import BaseProvider
from core.models import ServiceEventData, ServiceEvent, ServiceEventPurpose, UrineDrugScreen, Medication, BehavioralHealthNotes, Visit, Participant, Gender, Race, Service
from core.permissions import CASE_MANAGER, FRONT_DESK, ADMIN
from datetime import datetime, date
import random, re

fake = Faker()

DEFAULT_DEV_ENV_PASS = 'password123'
DEFAULT_GROUPS = [FRONT_DESK, CASE_MANAGER, ADMIN]

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
    call_command('loaddata', 'programs.yaml', 'services.yaml')
    create_groups()
    create_users()
    add_users_to_groups()
    create_participants()

def create_users(output=True):
    for group in DEFAULT_GROUPS:
        email = "{}@{}.com".format(group, group)
        u = User.objects.create_user(username=group, email=email)
        u.set_password(DEFAULT_DEV_ENV_PASS)

        if group == ADMIN:
            u.is_superuser=True
            u.is_staff=True

        u.save()

        if output:
            print("Created user: {}".format(email))

def create_groups(output=True):
    for group in DEFAULT_GROUPS:
        Group.objects.get_or_create(name=group)
        if output:
            print("Created group: {}".format(group))

def add_users_to_groups(output=True):
    """
    adds user to group of same name
    """

    for group in DEFAULT_GROUPS:
        user = User.objects.get(username=group)
        role_title = Group.objects.get(name=group)
        user.groups.add(role_title)

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
        create_visit(participant)

def random_bool():
    return bool(random.getrandbits(1))

def create_visit(participant):
    create_medication(participant)
    uds_service = Service.objects.get(data_klass_name="UrineDrugScreen")
    for _ in range(random.randint(2,10)):
        visit_date = fake.date_time_between(start_date=participant.start_date, end_date='+5y')
        visit = Visit(
                    participant=participant,
                    created_at=visit_date
                )
        visit.full_clean()
        visit.save()
        create_uds_results(visit, uds_service)

def create_medication(participant):
    meds = Medication(
        participant=participant,
        medication_name=fake.meds()[0],
        ingestion_frequency=fake.frequency()[0],
        medical_delivery=fake.sentence(nb_words=3, variable_nb_words=True, ext_word_list=None)
        )
    meds.full_clean()
    meds.save()

def create_service_event_arrived(visit, service):
    event = ServiceEvent(visit=visit, service=service, purpose=ServiceEventPurpose.ARRIVED.name)
    event.save()
    return event

def create_service_event_called(visit, service):
    event = ServiceEvent(visit=visit, service=service, purpose=ServiceEventPurpose.CALLED.name)
    event.save()
    return event

def create_uds_results(visit, service):
    participant = visit.participant

    create_service_event_arrived(visit, service)
    create_service_event_called(visit, service)

    seen = ServiceEvent(visit=visit, service=service, purpose=ServiceEventPurpose.SEEN.name)
    seen.save()

    uds = UrineDrugScreen(
            service_event=seen,
            uds_temp=random.randint(85,105),
            date_of_test=visit.created_at,
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
