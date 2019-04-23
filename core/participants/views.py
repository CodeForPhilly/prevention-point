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
    def get_queryset(self):
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        dob = self.request.query_params.get('dob', None)
        last_four_ssn = self.request.query_params.get('last_four_ssn', None)
        queryset = Participant.objects.all()
        if first_name is not None:
            queryset = queryset.filter(first_name__iexact=first_name)
        if last_name is not None:
            queryset = queryset.filter(last_name__iexact=last_name)
        if last_four_ssn is not None:
            queryset = queryset.filter(last_four_ssn=last_four_ssn)

        return queryset
    