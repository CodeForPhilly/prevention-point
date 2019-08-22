<<<<<<< HEAD


import random, pytz
=======
import random
>>>>>>> 6f221598814747d70887782a30a01a74620f6651
from django.utils import timezone
from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import Group, User

from faker import Faker
from faker.providers import BaseProvider

from core.models import UrineDrugScreen, Medication, Participant, Gender, Race, Program, Service, Visit
from core.permissions import CASE_MANAGER, FRONT_DESK, ADMIN
from core.models.front_desk_event import FrontDeskEventType, FrontDeskEvent

fake = Faker()

DEFAULT_DEV_ENV_PASS = 'password123'
DEFAULT_GROUPS = [FRONT_DESK, CASE_MANAGER, ADMIN]
DEFAULT_NUMBER_PARTICIPANTS = 10
DEFAULT_NUMBER_VISITS = 100

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
    create_groups(output=False)
    create_users(output=False)
    add_users_to_groups(output=False)
    create_participants()
    create_programs(output=False)
    create_visits(output=False)

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

def create_participants(uds=True, medication=True):
    '''Create a fake participant, and optionally associated UDS and meds'''
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
                pp_id=fake.password(length=5, special_chars=False, digits=True, lower_case=False),
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
    '''Create a meds for a given participant'''
    meds = Medication(
        participant=participant,
        medication_name=fake.meds()[0],
        ingestion_frequency=fake.frequency()[0],
        medical_delivery=fake.sentence(nb_words=3, variable_nb_words=True, ext_word_list=None)
        )
    meds.full_clean()
    meds.save()

def create_uds_results(participant):
    '''Create a fake UDS for a given participant'''
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
    '''Create programs and services from the DEFAULT_PROGRAMS dictionary, reflecting actual P-P organization'''
    for program, services in DEFAULT_PROGRAMS.items():
      p = Program()
      p.name = program
      p.full_clean()
      p.save()

      if output:
          print("Created program {}". format(p.name))

      for service in services:
          s = Service()
          s.name = service
          s.program = p
          s.available = random_bool()
          s.full_clean()
          s.save()

          if output:
              print("Created {}: '{}'". format(p.name, s.name))

def create_visits(output=True):
    '''Create fake visits and front desk events, depending on Participants and Programs. Visits are created using now(), i.e. today'''
    participants = Participant.objects.all()
    programs = Program.objects.all()

    for _ in range(DEFAULT_NUMBER_VISITS):
        v = Visit()
        v.participant = random.choice(participants)
<<<<<<< HEAD
        #v.created_at = pytz.utc.localize(fake.date_time())
=======
>>>>>>> 6f221598814747d70887782a30a01a74620f6651
        v.created_at = timezone.now()
        v.program = random.choice(programs)
        v.notes = fake.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None)
        v.full_clean()
        v.save()

        #Create FrontDeskEvents to correspond to the Visit, which always begins with ARRIVED
        arrived(v)

        if output:
            print("Created visit: {} {}, {}, {}, {}". format(v.participant.first_name, v.participant.last_name, v.created_at, v.program.name, v.notes))

def create_event(visit, type):
    '''Create a FrontDeskEvent for thie visit and of this type, e.g. ARRIVED, STEPPED_OUT. Events are created now(), i.e. today'''
    f = FrontDeskEvent()
    f.visit = visit
    f.event_type = type
    f.full_clean()
    f.save()

def arrived(visit):
    '''After ARRIVED, can be either LEFT, SEEN, STEPPED_OUT or pending (still in ARRIVED status)'''
    create_event(visit, "ARRIVED")
    random.choice([left, seen, stepped_out, pending])(visit)

def left(visit):
    create_event(visit, "LEFT")

def seen(visit):
    create_event(visit, "SEEN")

def stepped_out(visit):
    '''After STEPPED_OUT can be either LEFT, CAME_BACK or pending (still in STEPPED_OUT status)'''
    create_event(visit, "STEPPED_OUT")
    random.choice([left, came_back, pending])(visit)

def came_back(visit):
    '''After CAME_BACK, either LEFT, SEEN or pending (still in CAME_BACK status)'''
    create_event(visit, "CAME_BACK")
    random.choice([left, seen, pending])(visit)

def pending(visit):
    pass
