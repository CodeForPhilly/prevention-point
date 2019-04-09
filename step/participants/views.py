from rest_framework import viewsets, permissions
from step.models import Participant
from step.permissions import IsCaseManager
from .serializers import ParticipantSerializer

class ParticipantViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    """
    API endpoint that allows Participants to be viewed or edited
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
