from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from collections import namedtuple
from core.models import ServiceEvent, Service 
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN, HasGroupPermission
from core.service_events.serializer import ServiceEventAndAvailabilitySerializer, ServiceEventSerializer
from core.services.serializers import ServiceSerializer




# tuple for list 
EventsAndServices = namedtuple('EventsAndServices',('service_events', 'service_availability'),rename=True)

def add_availability_to_response(service_event):
    """
    makes a dictionary response object {"service_event":{}, "service_availability":{}}
    this function allows for service_event to be the object instead of a list of one object
    """
    availability_queryset = Service.objects.all()
    availability_serializer = ServiceSerializer(availability_queryset, many=True)
    events_and_services = dict(
        service_event = service_event,
        service_availability = availability_serializer.data
    )
    return events_and_services

class ServiceEventViewSet(viewsets.ViewSet):
    """
    API endpoint that allows Service Events to be viewed or edited.
    uses regular ViewSet to be able to display adjacent model responses in one view, hence the permission classes being repeated here instead of using viewsets.py prototypw
    """
    permission_classes = [HasGroupPermission, IsAuthenticated]
    permission_groups = {
        'create':[FRONT_DESK, CASE_MANAGER, ADMIN],
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }

    

    def list(self, request):
        """
        list of all service events and service availabilty
        """
        events_and_services = EventsAndServices(
            service_events = ServiceEvent.objects.all(),
            service_availability = Service.objects.all()
        )
        serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
        return Response(serializer.data)
  
    def retrieve(self, request, pk=None):
        """
        retrieve service event and service availabilty
        """
        try:
            queryset = ServiceEvent.objects.get(pk=pk)
        except ServiceEvent.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        event_serializer = ServiceEventSerializer(queryset)
        events_and_services = add_availability_to_response(event_serializer.data)    
        return Response(events_and_services)
         
    def create(self, request):
        """
        create service event
        """
        event_serializer = ServiceEventSerializer(data=request.data)
        if event_serializer.is_valid():
            event_serializer.save()
            events_and_services = add_availability_to_response(event_serializer.data)    
            return Response(events_and_services, status=status.HTTP_201_CREATED)
        return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    