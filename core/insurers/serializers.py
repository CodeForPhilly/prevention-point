from rest_framework import serializers
from django.utils import timezone
from core.models import Insurer

class InsurerSerializer(serializers.ModelSerializer):
  program = serializers.SlugRelatedField(read_only=True, slug_field='name')

  class Meta:
      model = Insurer
      fields = ('id', 'name', 'is_active')
      extra_kwargs = {
            'id': {'read_only': True},
            'name': {'read_only': True}
      }
