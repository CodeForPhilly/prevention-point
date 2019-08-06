from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import Group, User

from faker import Faker
from faker.providers import BaseProvider
from core.models import UrineDrugScreen, Medication, Participant, Gender, Race, Program, Service, Visit
from core.permissions import CASE_MANAGER, FRONT_DESK, ADMIN
import random
import pytz

fake = Faker()

DEFAULT_DEV_ENV_PASS = 'password123'
DEFAULT_GROUPS = [FRONT_DESK, CASE_MANAGER, ADMIN]
DEFAULT_USER_IDS = {
        'front_desk': ['1', '2', '3', '4'],
        'case_manager': ['5', '6', '7', '8'],
        'admin': ['9', '10']
    }

DEFAULT_NUMBER_PARTICIPANTS = 10
DEFAULT_NUMBER_VISITS = 20

#Cribbed from prevpoint-backend 2 July 2019 Marieke
DEFAULT_PROGRAMS = {
        'TESTING': ('RAPID', 'CONFIRM', 'NEED RESULTS', 'C-CHANGE', 'SNS'),
        'CM': ('BENEFITS', 'MENTAL HEALTH', 'HOUSING', 'D&A', 'APPT'),
        'SSHP': ('WOUND CARE', 'MEDICAL FORM', 'PHYSICAL', 'FOLLOW UP', 'OTHER:ENTER IN NOTES'),
        'LEGAL': ('BIRTH CERT', 'CONSULT', 'APPT', 'PUBLIC DEF'),
        'CRAFT': ('DETOX', 'INPATIENT', 'IOP', 'SUBOXONE', 'METHADONE'),
        'PHAN': ('BENEFITS', 'FOLLOW UP', 'APPT', 'FOUND THEM!', 'OTHER: ENTER IN NOTES'),
        'STEP': ('APPT: DR BARCLAY', 'APPT: DR SERGE', 'APPT: MOBILE MAT', 'PATIENT/ NO APPT', 'MEDICATION'),
        'BIENESTAR': ('APPT DR. BAMFORD', 'LABWORK', 'FIBROSCAN', 'MCM', 'FOUND THEM!'),
        'SKWC': ('DR. MORALES', 'NEW PATIENT', 'SICK VISIT', 'OTHER')
    }

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
    create_groups()
    create_users()
    #add_users_to_groups()
    create_participants(uds=False, medication=False)
    create_programs()
    create_visits()

def create_users(output=True):
    for group in DEFAULT_GROUPS:
        for id in DEFAULT_USER_IDS[group]:
            user_name = "{}_{}".format(group, id)
            email = "{}@{}.com".format(user_name, group)
            user = User.objects.create_user(username=user_name, email=email)
            user.set_password(DEFAULT_DEV_ENV_PASS)

            if group == ADMIN:
                user.is_superuser=True
                user.is_staff=True

            user.save()

            #Assign user to group
            role_title = Group.objects.get(name=group)
            user.groups.add(role_title)

            if output:
                print("Created user: {}".format(email))

def create_groups(output=True):
    for group in DEFAULT_GROUPS:
        print("Group = {}".format(group))
        Group.objects.get_or_create(name=group)

def add_users_to_groups(output=True):
    """
    adds user to group of same name
    """
    print("Okay to here!")
    for group in DEFAULT_GROUPS:
        user = User.objects.get(username=group)
        role_title = Group.objects.get(name=group)
        user.groups.add(role_title)
    print("Still okay!")

def create_participants(uds=True, medication=True):
    gender_list = list(Gender)
    race_list = list(Race)

    for _ in range(DEFAULT_NUMBER_PARTICIPANTS):
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
        if uds:
            create_uds_results(participant)
        if medication:
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

def create_programs(output=True):
    for program, services in DEFAULT_PROGRAMS.items():
      p = Program()
      p.name = program
      p.save()

      if output:
          print("Created program {}". format(p.name))

      for service in services:
          s = Service()
          s.name = service
          s.program = p
          s.available = random_bool()
          s.save()

          if output:
              print("Created {}: '{}'". format(p.name, s.name))

def create_visits(output=True):

    participants = Participant.objects.all()
    programs = Program.objects.all()

    for _ in range(DEFAULT_NUMBER_VISITS):
        v = Visit()
        v.participant = random.choice(participants)
        v.created_at = pytz.utc.localize(fake.date_time())
        v.program = random.choice(programs)
        v.notes = fake.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None)
        v.save()

        if output == True:
            print("Created visit: {} {}, {}, {}, {}". format(v.participant.first_name, v.participant.last_name, v.created_at, v.program.name, v.notes))

