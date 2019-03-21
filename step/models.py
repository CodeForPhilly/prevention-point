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
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    race = models.ForeignKey(Race, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
