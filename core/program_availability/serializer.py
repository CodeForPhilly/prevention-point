from rest_framework import serializers
from django.utils import timezone
from core.models import ProgramAvailability


class ProgramAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramAvailability
        fields = ('id', 'program', 'day_of_week', 'start_time', 'end_time' ) 
        read_only_fields = ['day_of_week', 'program']
