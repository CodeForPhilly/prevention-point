from django.db import models
from core.models.insurer import Insurer
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
    CAUCASIAN = 'white (caucasian)'
    ASIAN_PI = 'asian pi'
    NATIVE_AMERICAN = 'native american'
    LATINO = 'latino'
    OTHER = 'other'

class Participant(models.Model):
    GENDER_CHOICES = [(key.value, key.value.title()) for key in Gender]
    RACE_CHOICES = [(key.value, key.value.title()) for key in Race]

    first_name = models.CharField(db_index=True, max_length=50)
    last_name = models.CharField(db_index=True, max_length=100)
    last_four_ssn = models.CharField(max_length=4, verbose_name="Last 4 of SSN")
    pp_id = models.CharField(db_index=True, max_length=200, verbose_name="Prevention Point ID")
    gender = models.CharField(choices=GENDER_CHOICES, max_length=12)
    race = models.CharField(choices=RACE_CHOICES, max_length=24)
    date_of_birth = models.DateField()
    start_date = models.DateField()
    is_insured = models.BooleanField(default=False)
    insurer = models.ForeignKey(Insurer, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

