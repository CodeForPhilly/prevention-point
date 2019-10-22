from core.models import Participant
from rest_framework import serializers

class ParticipantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Participant

        fields = ('id', 'first_name', 'last_name', 'last_four_ssn', 'pp_id', 'gender', 'race', 'date_of_birth', 'start_date', 'is_insured', 'insurer')
