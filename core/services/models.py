from django.db import models
from core.programs.models import Program

class Service(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    available = models.BooleanField(default=False)
