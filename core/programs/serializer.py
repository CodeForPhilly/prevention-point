from rest_framework import serializers
from django.utils import timezone
from core.models import Program
# from core.program_service_map.serializer import ProgramServiceMapSerializer

class ProgramSerializer(serializers.ModelSerializer):
    # The ModelSerializer trait does not allow partial updates by
    # default. We can manually enable partial updates by passing in
    # `partial=True` to its constructor.
    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(ProgramSerializer, self).__init__(*args, **kwargs)

    # service_set = ProgramServiceMapSerializer(read_only=True)
    class Meta:
        model = Program
        fields = ('id', 'name', 'is_closed') # backwards nested relationship uses '_set'
