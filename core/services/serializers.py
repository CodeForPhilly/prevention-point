from rest_framework import serializers
from django.utils import timezone
from core.services.models import Service

class ServicesSerializer(serializers.ModelSerializer):
  program = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

  class Meta:
      model = Service
      fields = ('id', 'name', 'program', 'available')
