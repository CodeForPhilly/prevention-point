from django.db import models

class Gender(models.Model):
    gender_value = models.CharField(max_length=30)

class Race(models.Model):
    race_value = models.CharField(max_length=30)

# TODO: seed these tables ^^^
# The values for Gender are ‘male’, ‘female’, ‘mtf’, ‘ftm’, ‘gender queer’
# The values for race are ‘white caucasian’, ‘black african american’, ‘asian pi’, ‘native american’, ‘Latino’, ‘Other’

class Participant(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    last_four_ssn = models.CharField(max_length=4)
    pp_id = models.CharField(max_length=200)
    gender_id = models.ForeignKey(Gender, on_delete=models.CASCADE)
    race_id = models.ForeignKey(Race, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    start_date = models.DateFields()

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
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    role_id = models.ForeignKey(EmployeeRole, on_delete=models.CASCADE)

class CaseManagement(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    crs_seen = models.BooleanField(default=False)

class Appointment(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    appointment_timestamp = models.DateTimeField()
    crs_timestamp = models.DateTimeField()
    crs_employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    crs_seen = models.BooleanField(default=False)
    cm_timestamp = models.DateTimeField()
    cm_employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    cm_seen = models.BooleanField(default=False)
    hcv_status = models.BooleanField(default=False)

# TODO: we probably want to move the HCV data into its own table(s), similar to how UDS works

class BehavioralHealthNotes(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    note_timestamp = models.DateTimeField()
    behavior_note = models.TextField()

class HCVNotes(models.Model):
    participant_id = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    employee_id = models.ForeignKey(Employee, on_delete-models.CASCADE)
    note_timestamp = models.DateTimeField()
    hcv_note = models.TextField()
