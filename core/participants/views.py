from rest_framework import generics, viewsets
from core.models import Participant
from core.participants.serializers import ParticipantSerializer

class ParticipantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Participants to be viewed or edited
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer


class ParticipantListView(generics.ListAPIView):
    """
    Read-only endpoint for listing participants
    """
    serializer_class = ParticipantSerializer
    model = serializer_class.Meta.model
    def get_queryset(self):
        return Participant.objects.all()
