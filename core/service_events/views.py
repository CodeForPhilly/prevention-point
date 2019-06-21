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
from rest_framework import status

EventsAndServices = namedtuple('EventsAndServices',('service_events', 'availability'))

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
            queryset = ServiceEvent.objects.filter(pk=pk)
            if not queryset:
                 return Response(status=status.HTTP_404_NOT_FOUND)
            events_and_services = EventsAndServices(
                service_events = queryset,
                availability = Service.objects.all()
            )
            serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
            return Response(serializer.data)
         
    def create(self, request):
        service_event=request.data
        serializer = ServiceEventSerializer(data=service_event)
        if serializer.is_valid():
            serializer.save()
            queryset = ServiceEvent.objects.filter(pk=serializer.data['id'])
            events_and_services = EventsAndServices(
                service_events = queryset,
                availability = Service.objects.all()
            )
            event_availabilty_serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
            return Response(event_availabilty_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        queryset = ServiceEvent.objects.filter(pk=pk)
        if not queryset:
             return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ServiceEventSerializer(queryset, data=service_event)
        if serializer.is_valid():
            serializer.save()
            queryset = ServiceEvent.objects.filter(pk=serializer.data['id'])
            events_and_services = EventsAndServices(
                service_events = queryset,
                availability = Service.objects.all()
            )
            event_availabilty_serializer = ServiceEventAndAvailabilitySerializer(events_and_services, context={"request": request})
            return Response(event_availabilty_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    