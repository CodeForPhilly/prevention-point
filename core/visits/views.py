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
