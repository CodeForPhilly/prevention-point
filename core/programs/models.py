from django.db import models

class Program(models.Model):
    name = models.CharField(max_length=100)
