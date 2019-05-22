from rest_framework import serializers
from django.utils import timezone
from core.services.models import Service

class ServiceSerializer(serializers.ModelSerializer):
  program = serializers.SlugRelatedField(read_only=True, slug_field='name')

  class Meta:
      model = Service
      fields = ('id', 'name', 'program', 'available')
