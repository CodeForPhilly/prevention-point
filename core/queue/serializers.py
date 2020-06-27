from rest_framework import serializers
from django.utils import timezone
from core.models import Program


class QueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ("id", "name", "services")
