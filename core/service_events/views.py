from rest_framework import generics, viewsets
from rest_framework.response import Response
from core.models import ServiceEvent
from core.service_events.serializer import ServiceEventAndAvailabilitySerializer, ServiceEventSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN
from core.models import Service 
from collections import namedtuple
from rest_framework.permissions import IsAuthenticated
from core.permissions import HasGroupPermission
from django.http import Http404

EventsAndServices = namedtuple('EventsAndServices',('service_events', 'availability'))

class ServiceEventViewSet(viewsets.ViewSet):
    """
    API endpoint that allows Service Events to be viewed or edited
    """
    permission_classes = [HasGroupPermission, IsAuthenticated]
    permission_groups = {
        'create':[FRONT_DESK, CASE_MANAGER, ADMIN],
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'update': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }

    def list(self, request):
        events_and_services = EventsAndServices(
            service_events = ServiceEvent.objects.all(),
            availability = Service.objects.all()
        )
        serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
        return Response(serializer.data)
  
    def retrieve(self, request, pk=None):
            queryset = ServiceEvent.objects.filter(pk=pk)
            if not queryset:
                raise Http404('service event not found')
            events_and_services = EventsAndServices(
                service_events = queryset,
                availability = Service.objects.all()
            )
            serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
            return Response(serializer.data)
         
   