from django.db import models
from . import Question

class Option(models.Model):
    question = models.ForeignKey(Question, null=True, on_delete=models.CASCADE)
    option = models.CharField(max_length=100)
    value = models.IntegerField()