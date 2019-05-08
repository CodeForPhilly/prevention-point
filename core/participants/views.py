from rest_framework import generics, viewsets
from core.models import Participant
from core.participants.serializers import ParticipantSerializer
from core.permissions import HasGroupPermission

class ParticipantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Participants to be viewed or edited
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [HasGroupPermission]
    permission_groups = {
        'create':['front_desk', 'admin'], #POST
        'retrieve': ['front_desk', 'case_manager', 'admin'], #GET one
        'update': ['front_desk', 'case_manager', 'admin'], #PATCH
        'list': ['front_desk', 'case_manager', 'admin'] #GET all
        # 'delete':['front_desk', 'admin'] no one can delete, with no delete permission
    }

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
        if dob is not None:
            queryset = queryset.filter(date_of_birth=dob)

        return queryset
    