from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from core.viewsets import ModelViewSet
from core.models import Visit, Participant
from core.visits.serializer import (
    VisitSerializer, PopulatedVisitSerializer, ParticipantVisitsSerializer
)
from core.permissions import DjangoModelPermissions


class VisitViewSet(ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """

    queryset = Visit.objects.all()

    def get_serializer_class(self):
        """
        override default serializer_class attribute to use unpopulated serializer for saving to db
        to avoid needing the entire participant object to post
        """
        if self.request.method in ["GET"]:
            return PopulatedVisitSerializer
        return VisitSerializer

class ParticipantVisitsView(ListAPIView):
    """
    API endpoint listing all visits for a given participant.
    """
    serializer_class = ParticipantVisitsSerializer
    permission_classes = [DjangoModelPermissions, IsAuthenticated]

    def get_queryset(self):
        participant_id = self.kwargs['participant_id']
        return Visit.objects.filter(participant=participant_id)

    def list(self, request, participant_id):
        if not Participant.objects.filter(pk=participant_id).exists():
            raise NotFound()
        return super().list(request, participant_id)
