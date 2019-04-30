from rest_framework import serializers
from django.utils import timezone
from core.models import Visit


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = ('id', 'participant', 'created_at')
