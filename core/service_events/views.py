from rest_framework import generics, viewsets
from rest_framework.response import Response
from core.models import ServiceEvent
from core.service_events.serializer import ServiceEventAndAvailabilitySerializer, ServiceEventSerializer
from core.services.serializers import ServiceSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN
from core.models import Service 
from collections import namedtuple
from rest_framework.permissions import IsAuthenticated
from core.permissions import HasGroupPermission
from django.http import Http404
from rest_framework import status

EventsAndServices = namedtuple('EventsAndServices',('service_events', 'availability'),rename=True)

def add_availability_to_response(service_event):
        availability_queryset = Service.objects.all()
        availability_serializer = ServiceSerializer(availability_queryset, many=True)
        events_and_services = dict(
            service_event = service_event,
            availability = availability_serializer.data
        )
        return events_and_services

class ServiceEventViewSet(viewsets.ViewSet):
    """
    API endpoint that allows Service Events to be viewed or edited
    """
    # permission_classes = [HasGroupPermission, IsAuthenticated]
    # permission_groups = {
    #     'create':[FRONT_DESK, CASE_MANAGER, ADMIN],
    #     'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
    #     'update': [FRONT_DESK, CASE_MANAGER, ADMIN],
    #     'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    # }

    

    def list(self, request):
        events_and_services = EventsAndServices(
            service_events = ServiceEvent.objects.all(),
            availability = Service.objects.all()
        )
        serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
        return Response(serializer.data)
  
    def retrieve(self, request, pk=None):
            try:
                queryset = ServiceEvent.objects.get(pk=pk)
            except ServiceEvent.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            event_serializer = ServiceEventSerializer(queryset)
            events_and_services = add_availability_to_response(event_serializer.data)    
            return Response(events_and_services)
         
    def create(self, request):
        event_serializer = ServiceEventSerializer(data=request.data)
        if event_serializer.is_valid():
            event_serializer.save()
            events_and_services = add_availability_to_response(event_serializer.data)    
            return Response(events_and_services, status=status.HTTP_201_CREATED)
        return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        queryset = ServiceEvent.objects.filter(pk=pk)
        if not queryset:
             return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ServiceEventSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            service_event = ServiceEvent.objects.filter(pk=serializer.data['id'])
            events_and_services = EventsAndServices(
                service_events = service_event,
                availability = Service.objects.all()
            )
            event_availabilty_serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
            return Response(event_availabilty_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    