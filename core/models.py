from django.db import models
from django.utils import timezone
from enum import Enum
from core.participants.models import Participant
class Medication(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    medical_delivery = models.CharField(max_length=100)
    medication_name = models.CharField(max_length=100)
    ingestion_frequency = models.IntegerField()

class UrineDrugScreen(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    date_of_test = models.DateField()
    uds_temp = models.CharField(max_length=100, verbose_name="Urine Temperature")
    # TODO: does this belong here? if so, is it a Bool for if a PT was taken, or Bool for if pregnant?
    pregnancy_test = models.BooleanField(default=False)
    opiates = models.BooleanField(default=False)
    fentanyl = models.BooleanField(default=False)
    bup = models.BooleanField(default=False, verbose_name="Buprenorphine")
    coc = models.BooleanField(default=False, verbose_name="Cocaine")
    amp = models.BooleanField(default=False, verbose_name = "Amphetamine")
    m_amp = models.BooleanField(default=False, verbose_name = "Methamphetamine")
    thc = models.BooleanField(default=False, verbose_name = "THC")
    mtd = models.BooleanField(default=False, verbose_name = "Methadone")
    pcp = models.BooleanField(default=False, verbose_name = "PCP")
    bar = models.BooleanField(default=False, verbose_name = "Barbiturates")
    bzo = models.BooleanField(default=False, verbose_name = "Benzodiazepines")
    tca = models.BooleanField(default=False, verbose_name = "Tricyclic Antidepressants")
    oxy = models.BooleanField(default=False, verbose_name = "Oxycodone")

    def __str__(self):
        return 'UDS #%i for Participant #%i' % (self.id, self.participant_id)

class EmployeeRole(models.Model):
    role_value = models.CharField(max_length=30)

    def __str__(self):
        return '%s' % (self.role_value)

# TODO: seed with front desk, case manager, admin

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    role = models.ForeignKey(EmployeeRole, on_delete=models.CASCADE)

    def __str__(self):
        return '%s %s %s' % (self.first_name, self.last_name, self.role)

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

class Visit(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

class ServiceEvent(models.Model):
    class ServiceEventPurpose(Enum):
        ARRIVED = 'arrived'
        CALLED = 'called'
        SEEN = 'seen'
        LEFT = 'left'

    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    # service = models.ForeignKey(Service, on_delete=models.CASCADE)
    purpose = models.CharField(
        max_length=10,
        choices=[(tag.name, tag.value) for tag in ServiceEventPurpose]
    )
