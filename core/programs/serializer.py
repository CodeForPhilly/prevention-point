from rest_framework import serializers
from django.utils import timezone
from core.models import Program
from core.services.serializers import ServiceforProgramSerializer

class ProgramSerializer(serializers.ModelSerializer):
    # The ModelSerializer trait does not allow partial updates by
    # default. We can manually enable partial updates by passing in
    # `partial=True` to its constructor.
    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(ProgramSerializer, self).__init__(*args, **kwargs)

    service_set = ServiceforProgramSerializer(many=True, read_only=True)
    class Meta:
        model = Program
        fields = ('id', 'name', 'is_closed', 'service_set') # backwards nested relationship uses '_set'

class ProgramForMapSerializer(serializers.ModelSerializer):
    """
    This is for program service map objects, so you can display Program and service info at the same level in response
    without redundancy
    """
    class Meta:
        model = Program
        fields = ('id', 'name', 'is_closed') 
