from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import action

from core.viewsets import ModelViewSet
from core.models import Participant
from core.participants.serializers import ParticipantSerializer
from core.visits.serializer import ParticipantVisitsSerializer


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
            raise NotFound()

        return queryset

    @action(detail=True)
    def visits(self, request, pk=None):
        """List all visits for a given participant."""
        if not request.user.has_perm('core.view_visit'):
            raise PermissionDenied()
        participant = self.get_object()
        serializer = ParticipantVisitsSerializer(participant.visit_set.all(), many=True)
        return Response(serializer.data)
