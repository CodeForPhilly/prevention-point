from rest_framework import serializers
from django.utils import timezone
from core.models import Program
from core.services.serializers import ServiceforProgramSerializer

class QueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'name', 'service_set') # backwards nested relationship uses '_set'

