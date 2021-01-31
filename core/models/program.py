from django.db import models

class Program(models.Model):
    name = models.CharField(max_length=100)
    is_closed = models.BooleanField(default=False)
    is_frozen = models.BooleanField(default=False)
    has_queue = models.BooleanField(default=True)

    def __str__(self):
        return '%s' % (self.name)
