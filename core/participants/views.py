from core.viewsets import ModelViewSet
from core.models import Participant
from core.participants.serializers import ParticipantSerializer
from rest_framework import status
from rest_framework.response import Response

class ParticipantViewSet(ModelViewSet):
    """
    API endpoint that allows Participants to be viewed or edited
    """
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        dob = self.request.query_params.get('dob', None)
        last_four_ssn = self.request.query_params.get('last_four_ssn', None)
        maiden_name = self.request.query_params.get('maiden_name', None)
        pp_id = self.request.query_params.get('pp_id', None)
        sep_id = self.request.query_params.get('sep_id', None)
        queryset = Participant.objects.all()
        if first_name is not None:
            queryset = queryset.filter(first_name__istartswith=first_name)
        if sep_id is not None:
            queryset = queryset.filter(sep_id__contains=sep_id)
        if last_name is not None:
            queryset = queryset.filter(last_name__istartswith=last_name)
        if last_four_ssn is not None:
            queryset = queryset.filter(last_four_ssn=last_four_ssn)
        if dob is not None:
            queryset = queryset.filter(date_of_birth=dob)
        if pp_id is not None:
            queryset = queryset.filter(pp_id=pp_id)
        if maiden_name is not None:
            queryset = queryset.filter(maiden_name__istartswith=maiden_name)
        if not queryset.exists():
            content = {'Whoopsie.':'No participant found.'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        return queryset
