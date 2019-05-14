from core.viewsets import ModelViewSet
from core.models import Participant
from core.participants.serializers import ParticipantSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class ParticipantViewSet(ModelViewSet):
    """
    API endpoint that allows Participants to be viewed or edited
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_groups = {
        'create':[FRONT_DESK, ADMIN],
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'update': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }

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
