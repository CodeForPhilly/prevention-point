from rest_framework import viewsets
from core.models import ServiceEvent
from core.service_events.serializer import ServiceEventSerializer


class ServiceEventViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Service Events to be viewed or edited
    """
    queryset = ServiceEvent.objects.all()
    serializer_class = ServiceEventSerializer
