from django.db import models
from .program import Program

class Service(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    data_klass_name = models.CharField(max_length=100, default="NotSet")
    available = models.BooleanField(default=False)
