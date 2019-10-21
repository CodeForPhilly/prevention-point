from rest_framework import serializers
from core.models.insurer import Insurer

class InsurerSerializer(serializers.ModelSerializer):
  class Meta:
      model = Insurer
      fields = ('id', 'name', 'is_active')
