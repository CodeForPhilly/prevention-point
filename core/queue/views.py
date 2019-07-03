from rest_framework import generics, viewsets, status
from core.models import Program
from core.programs.serializer import ProgramSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN, HasGroupPermission
from rest_framework.permissions import IsAuthenticated

class QueueViewSet(viewsets.ViewSet):
  
  """
  API endpoint that displays the queue
  uses regular ViewSet to be able to display adjacent model responses in one view, 
  hence the permission classes being repeated here instead of using viewsets.py prototypw
  # """
  # permission_classes = [HasGroupPermission, IsAuthenticated]
  # permission_groups = {
  #     'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN]
  # }
  
  def retrieve(self, request, program_id=None):
      """
      retrieve visit by id and service availabilty
      """
      print(program_id)
      # try:
      #     queryset = .objects.get(pk=pk)
      # except Visit.DoesNotExist:
      #     return Response(status=status.HTTP_404_NOT_FOUND)
      # visit_serializer = VisitSerializer(queryset)
      # visits_and_services = add_availability_to_response(visit_serializer.data)    
      # return Response(visits_and_services)
       