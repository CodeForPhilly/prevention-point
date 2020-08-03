from django.db import models
from . import Program

class Form(models.Model):
    label = models.CharField(max_length=30)
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, null=True, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    added = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)