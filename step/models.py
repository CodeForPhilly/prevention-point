from django.db import models

from enum import Enum

class Gender(Enum):
    MALE = 'male'
    FEMALE = 'female'
    MTF = 'mtf'
    FTM = 'ftm'
    GENDER_QUEER = 'gender queer'
    OTHER = 'other'

class Race(Enum):
    BLACK_AFRICAN_AMERICAN = 'black (african american)'
    CAUCASIAN = 'white (caucasion)'
    ASIAN_PI = 'asian pi'
    NATIVE_AMERICAN = 'native american'
    LATINO = 'latino'
    OTHER = 'other'

class Participant(models.Model):
    GENDER_CHOICES = [(key.value, key.value.title()) for key in Gender]
    RACE_CHOICES = [(key.value, key.value.title()) for key in Race]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    last_four_ssn = models.CharField(max_length=4, verbose_name="Last 4 of SSN")
    pp_id = models.CharField(max_length=200, verbose_name="Prevention Point ID")
    gender = models.CharField(choices=GENDER_CHOICES, max_length=12)
    race = models.CharField(choices=RACE_CHOICES, max_length=24)
    date_of_birth = models.DateField()
    start_date = models.DateField()

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

class Medication(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    medical_delivery = models.CharField(max_length=100)
    medication_name = models.CharField(max_length=100)
    ingestion_frequency = models.IntegerField()

class UrineDrugScreen(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    date_of_test = models.DateField()
    uds_temp = models.CharField(max_length=100)
    opiates = models.BooleanField(default=False)
    fentanyl = models.BooleanField(default=False)
    bup = models.BooleanField(default=False)
    pregnancy_test = models.BooleanField(default=False)
    coc = models.BooleanField(default=False)
    amp = models.BooleanField(default=False)
    m_amp = models.BooleanField(default=False)
    thc = models.BooleanField(default=False)
    mtd = models.BooleanField(default=False)
    pcp = models.BooleanField(default=False)
    bar = models.BooleanField(default=False)
    bzo = models.BooleanField(default=False)
    tca = models.BooleanField(default=False)
    oxy = models.BooleanField(default=False)

class EmployeeRole(models.Model):
    role_value = models.CharField(max_length=30)

# TODO: seed with front desk, case manager, admin

class Employee(models.Model):
    fist_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    role_id = models.ForeignKey(EmployeeRole, on_delete=models.CASCADE)

class CaseManagement(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    crs_seen = models.BooleanField(default=False)

class Appointment(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)

    cm_employee = models.ForeignKey(
            Employee, related_name='cm_%(class)s', on_delete=models.CASCADE
            )

    crs_employee = models.ForeignKey(
            Employee, related_name='crs_%(class)s', on_delete=models.CASCADE
            )

    appointment_timestamp = models.DateTimeField()
    crs_timestamp = models.DateTimeField()
    crs_seen = models.BooleanField(default=False)
    cm_timestamp = models.DateTimeField()
    cm_seen = models.BooleanField(default=False)
    hcv_status = models.BooleanField(default=False)

# TODO: we probably want to move the HCV data into its own table(s), similar to how UDS works

class BehavioralHealthNotes(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    behavior_note = models.TextField()

class HCVNotes(models.Model):
    participant = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    hcv_note = models.TextField()
