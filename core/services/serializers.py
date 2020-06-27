from rest_framework import serializers
from django.utils import timezone
from core.models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "name", "available", "program")
        extra_kwargs = {"name": {"read_only": True}}


class ServiceForProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "name", "available")
        extra_kwargs = {"name": {"read_only": True}}
