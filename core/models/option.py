from django.db import models
from . import Program, Form, Question

class Option(models.Model):
    program = models.ForeignKey(Program, null=True, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, null=True, on_delete=models.CASCADE)
    form = models.ForeignKey(Form, null=True, on_delete=models.CASCADE)
    option = models.CharField(max_length=100)
    value = models.IntegerField()