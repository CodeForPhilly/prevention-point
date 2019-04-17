from rest_framework import viewsets
from core.models import Participant
from core.participants.serializers import ParticipantSerializer

class ParticipantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Participants to be viewed or edited
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
