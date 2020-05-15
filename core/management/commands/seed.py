import random, pytz, datetime

from django.utils import timezone
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, User, Permission

from faker import Faker
from faker.providers import BaseProvider

from core.models import (
    Race,
    Visit,
    Gender,
    Insurer,
    Program,
    Service,
    Medication,
    Participant,
    UrgencyLevel,
    FrontDeskEvent,
    UrineDrugScreen,
    ProgramServiceMap,
    FrontDeskEventType, 
    ProgramAvailability,
)


fake = Faker()

DEFAULT_NUMBER_PARTICIPANTS = 1000
DEFAULT_NUMBER_VISITS = 100
DEFAULT_NUMBER_INSURERS = 10

# Cribbed from prevpoint-backend 2 July 2019 Marieke
DEFAULT_PROGRAMS = {
    "TESTING": ("RAPID", "CONFIRM", "NEED RESULTS", "C-CHANGE", "SNS"),
    "CM": ("BENEFITS", "MENTAL HEALTH", "HOUSING", "D&A", "APPT"),
    "SSHP": (
        "WOUND CARE",
        "MEDICAL FORM",
        "PHYSICAL",
        "FOLLOW UP",
        "OTHER:ENTER IN NOTES",
    ),
    "LEGAL": ("BIRTH CERT", "CONSULT", "APPT", "PUBLIC DEF"),
    "CRAFT": ("DETOX", "INPATIENT", "IOP", "SUBOXONE", "METHADONE"),
    "PHAN": ("BENEFITS", "FOLLOW UP", "APPT", "FOUND THEM!", "OTHER: ENTER IN NOTES"),
    "STEP": (
        "APPT: DR BARCLAY",
        "APPT: DR SERGE",
        "APPT: MOBILE MAT",
        "PATIENT/ NO APPT",
        "MEDICATION",
    ),
    "BIENESTAR": ("APPT DR. BAMFORD", "LABWORK", "FIBROSCAN", "MCM", "FOUND THEM!"),
    "SKWC": ("DR. MORALES", "NEW PATIENT", "SICK VISIT", "OTHER"),
}


class Command(BaseCommand):
    help = "seed database for testing and development."

    def handle(self, *args, **options):
        run_seed(self)


class MedsProvider(BaseProvider):
    __provider__ = "meds"
    __lang__ = "en_US"

    def meds(self):
        meds = [u"film", u"tab", u"vivitrol"]
        return random.choices(meds)


fake.add_provider(MedsProvider)


class FrequencyProvider(BaseProvider):
    __provider__ = "frequency"
    __lang__ = "en_US"

    def frequency(self):
        frequency = [7, 14, 28, 21, 3]
        return random.choices(frequency)


fake.add_provider(FrequencyProvider)


class MonFriProvider(BaseProvider):
    __provider__ = "day of week"
    __lang__ = "en_US"

    def mon_fri(self):
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        return random.choices(days)


fake.add_provider(MonFriProvider)


class AvailabilityWindowProvider(BaseProvider):
    """For HRSC sign in. HRSC appointments are available Mon-Fri, 10a-4p"""
    __provider__ = "availability window"
    __lang__ = "en_US"

    def availability_window(self, start_hour = 10, end_hour = 17):
        """Returns a tuple (start_time, end_time)"""
        window_begin = random.randint(start_hour, end_hour - 2)
        end_hour = random.randint(window_begin + 1, end_hour)
        return datetime.time(hour=window_begin), datetime.time(hour=end_hour)
       

fake.add_provider(AvailabilityWindowProvider)


def run_seed(self):
    call_command("migrate", interactive=False)
    call_command("flush", interactive=False)
    call_command("users_and_groups")
    create_insurers(output=False)
    create_participants()
    create_programs(output=False)
    create_visits(output=False)
    create_program_availability(output=False)



def create_insurers(output=True):
    for _ in range(DEFAULT_NUMBER_INSURERS):
        insurer = Insurer(name=fake.company(), is_active=random_bool())
        insurer.full_clean()
        insurer.save()

        if output:
            print(
                "Created insurer name: {} active: {}".format(
                    insurer.name, insurer.is_active
                )
            )


def create_participants():
    """Create a fake participant, and optionally associated UDS and meds"""
    gender_list = list(Gender)
    race_list = list(Race)
    insurers = Insurer.objects.all()

    for _ in range(DEFAULT_NUMBER_PARTICIPANTS):
        last_four = fake.ssn(taxpayer_identification_number_type="SSN")[-4:]
        profile = fake.profile()
        gender = random.choice(gender_list)
        race = random.choice(race_list)

        participant = Participant(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            pp_id=fake.password(
                length=5, special_chars=False, digits=True, lower_case=False
            ),
            gender=gender.value,
            race=race.value,
            last_four_ssn=last_four,
            date_of_birth=profile["birthdate"],
            start_date=fake.date_time(),
            is_insured=random_bool(),
            insurer=random.choice(insurers),
        )
        participant.full_clean()
        participant.save()


def random_bool():
    return bool(random.getrandbits(1))


def create_medication(visit):
    """Create a meds for a given participant"""
    meds = Medication(
        visit=visit,
        medication_name=fake.meds()[0],
        ingestion_frequency=fake.frequency()[0],
        medical_delivery=fake.sentence(
            nb_words=3, variable_nb_words=True, ext_word_list=None
        ),
    )
    meds.full_clean()
    meds.save()


def create_uds_results(visit):
    """Create a fake UDS for a given participant"""
    for _ in range(random.randint(2, 10)):
        test_date = fake.date_time_between(
            start_date=visit.participant.start_date, end_date="+5y"
        )

        uds = UrineDrugScreen(
            visit=visit,
            uds_temp=random.randint(85, 105),
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
    """Create programs and services from the DEFAULT_PROGRAMS dictionary, reflecting actual P-P organization"""
    for program, services in DEFAULT_PROGRAMS.items():
        p = Program()
        p.name = program
        p.full_clean()
        p.save()

        if output:
            print("Created program {}".format(p.name))

        for service in services:
            s = Service()
            s.name = service
            s.available = random_bool()
            s.full_clean()
            s.save()
            psm = ProgramServiceMap()
            psm.service = s
            psm.program = p
            psm.save()

            if output:
                print("Created {}: '{}'".format(p.name, s.name))


def create_visits(output=True, uds=True, medication=True):
    """Create fake visits and front desk events, depending on Participants and Programs. Visits are created using now(), i.e. today"""
    participants = Participant.objects.all()
    p_s_maps = ProgramServiceMap.objects.all()

    for _ in range(DEFAULT_NUMBER_VISITS):
        v = Visit()
        v.participant = random.choice(participants)
        # v.created_at = pytz.utc.localize(fake.date_time())
        v.created_at = timezone.now()
        v.program_service_map = random.choice(p_s_maps)
        v.urgency = random.choice(list(UrgencyLevel)).name
        v.notes = fake.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None)
        v.full_clean()
        v.save()

        # Create FrontDeskEvents to correspond to the Visit, which always begins with ARRIVED
        arrived(v)

        if uds:
            create_uds_results(v)
        if medication:
            create_medication(v)

        if output:
            print(
                "Created visit: {} {}, {}, {}, {}".format(
                    v.participant.first_name,
                    v.participant.last_name,
                    v.created_at,
                    v.program.name,
                    v.notes,
                )
            )

def create_event(visit, type):
    """Create a FrontDeskEvent for thie visit and of this type, e.g. ARRIVED, STEPPED_OUT. Events are created now(), i.e. today"""
    f = FrontDeskEvent()
    f.visit = visit
    f.event_type = type
    f.full_clean()
    f.save()


def create_program_availability(output=True):
    """create program availability"""
    programs = Program.objects.all()
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for program in programs:
        for day in days_of_week:
            if random.randint(0, 10) < 8:
                availability = ProgramAvailability()
                availability.program = program
                availability.day_of_week = day
                availability.start_time, availability.end_time = fake.availability_window(
                    start_hour=8, end_hour=18)
                window_one_end = availability.end_time.hour
                availability.full_clean()
                availability.save()
                if window_one_end < 15:
                    availability_two = ProgramAvailability()
                    availability_two.program = program
                    availability_two.day_of_week = day
                    availability_two.start_time, availability_two.end_time = fake.availability_window(
                        start_hour=window_one_end+1, end_hour=23)
                    availability_two.full_clean()
                    availability_two.save()

    if output:
        for availability in ProgramAvailability.objects.all().order_by('program'): 
            print(f"Created program availability: {availability.program.name} {availability.day_of_week} {availability.start_time} {availability.end_time}")


def arrived(visit):
    """After ARRIVED, can be either LEFT, SEEN, STEPPED_OUT or pending (still in ARRIVED status)"""
    create_event(visit, "ARRIVED")
    random.choice([left, seen, stepped_out, pending])(visit)

def left(visit):
    create_event(visit, "LEFT")

def seen(visit):
    create_event(visit, "SEEN")

def stepped_out(visit):
    """After STEPPED_OUT can be either LEFT, ARRIVED or pending (still in STEPPED_OUT status)"""
    create_event(visit, "STEPPED_OUT")
    random.choice([left, arrived, pending])(visit)

def pending(visit):
    pass
