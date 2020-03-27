from django.db import models
from core.models import Program
from core.models import Service

class ProgramServiceMap(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
