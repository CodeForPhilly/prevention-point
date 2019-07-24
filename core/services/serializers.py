from rest_framework import serializers
from django.utils import timezone
from core.models import Service

class ServiceSerializer(serializers.ModelSerializer):
  program = serializers.SlugRelatedField(read_only=True, slug_field='name')

  class Meta:
      model = Service
      fields = ('id', 'name', 'program', 'available')
      extra_kwargs = {
            'name': {'read_only': True}
      }
      #TODO: not sure if this is what we want- goal for the read only tag is to only allow
      # 'available' to be updated.

class ServiceforProgramSerializer(serializers.ModelSerializer):

  class Meta:
      model = Service
      fields = ('id', 'name', 'available')
