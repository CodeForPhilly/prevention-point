from step.models import Participant
from rest_framework import serializers

class ParticipantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Participant
        fields = ('first_name', 'last_name', 'gender', 'race')
