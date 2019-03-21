from django.db import models

class Gender(model.Model):
    gender_value = model.CharField(max_length=30)

class Race(model.Model):
    race_value = model.CharField(max_length=30)

# TODO: seed these tables ^^^

class Participant(model.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    last_four_ssn = models.CharField(max_length=4)
    pp_id = models.CharField(max_length=200)
    gender_id = models.ForeignKey(Gender, on_delete=models.CASCADE)
    race_id = models.ForeignKey(Race, on_delete=models.CASCADE)
    date_of_birth = models.DateField()

class Medical(model.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    medical_delivery = models.CharField(max_length=100)
    medication_name = models.CharField(max_length=100)
    ingestion_frequency = models.IntegerField()

class UrineDrugScreen(model.Model):
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
