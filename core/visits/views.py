from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.models import Visit, Service 
from core.visits.serializer import VisitSerializer, VisitAndServiceAvailabilitySerializer
from core.services.serializers import ServiceSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN, HasGroupPermission
from collections import namedtuple

# tuple for list 
VisitsAndServices = namedtuple('VisitsAndServices',('visits', 'service_availability'),rename=True)

def add_availability_to_response(visit):
    """
    makes a dictionary response object {"visit":{}, "service_availability":{}}
    this function allows for visit value to be an object instead of a list of one object
    """
    availability_queryset = Service.objects.all()
    availability_serializer = ServiceSerializer(availability_queryset, many=True)
    visits_and_services = dict(
        visit = visit,
        service_availability = availability_serializer.data
    )
    return visits_and_services

class VisitViewSet(viewsets.ViewSet):
    """
    API endpoint that allows visits to be viewed or edited.
    uses regular ViewSet to be able to display adjacent model responses in one view, hence the permission classes being repeated here instead of using viewsets.py prototypw
    """
    permission_classes = [HasGroupPermission, IsAuthenticated]
    permission_groups = {
        'create':[FRONT_DESK, CASE_MANAGER, ADMIN],
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [CASE_MANAGER, ADMIN]
    }

    def list(self, request):
        """
        list of all visits and service availabilty
        """
        visits_and_services = VisitsAndServices(
            visits = Visit.objects.all(),
            service_availability = Service.objects.all()
        )
        serializer = VisitAndServiceAvailabilitySerializer(visits_and_services, context={"request": request})
        return Response(serializer.data)
  
    def retrieve(self, request, pk=None):
        """
        retrieve visit by id and service availabilty
        """
        try:
            queryset = Visit.objects.get(pk=pk)
        except Visit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        visit_serializer = VisitSerializer(queryset)
        visits_and_services = add_availability_to_response(visit_serializer.data)    
        return Response(visits_and_services)
         
    def create(self, request):
        """
        create service event
        """
        visit_serializer = VisitSerializer(data=request.data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            visits_and_services = add_availability_to_response(visit_serializer.data)    
            return Response(visits_and_services, status=status.HTTP_201_CREATED)
        return Response(visit_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

