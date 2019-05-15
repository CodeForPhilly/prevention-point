from rest_framework import serializers
from django.utils import timezone
from core.programs.models import Program

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'name')
