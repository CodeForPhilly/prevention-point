from rest_framework import viewsets
from step.models import Participant
from step.participants.serializers import ParticipantSerializer

class ParticipantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Participants to be viewed or edited
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
