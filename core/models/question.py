from django.db import models
from enum import Enum
from . import Form

class Type(Enum):
    DATE = 'date'
    NUMBER = 'number'
    RADIO = 'radio'
    SELECT = 'select'
    TEXT = 'text'
    TEXTAREA = 'textarea'

class Question(models.Model):
    TYPE_CHOICES = [(key.value, key.value.title()) for key in Type]

    form = models.ForeignKey(Form, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    question = models.CharField(max_length=100)
    input_type = models.CharField(choices=TYPE_CHOICES, max_length=24)
    active = models.BooleanField(default=True)
