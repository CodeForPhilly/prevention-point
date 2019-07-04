from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from core.models import Program, Visit
from core.visits.serializer import VisitSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN, HasGroupPermission
from rest_framework.permissions import IsAuthenticated
import datetime

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
      retrieve most recent front desk event for each 
      visit that is happening today, filtered by program
      """
      
      # filter by visits that are happening today in a certain program
      visits_queryset = Visit.objects.filter(program_id=program_id, created_at__date=datetime.date.today())
      if visits_queryset.exists():
        todays_visit_data = VisitSerializer(visits_queryset, many=True).data
        
      else: 
        return Response(status=status.HTTP_404_NOT_FOUND)
      # for each visit, get the most recent front desk event, to glean current visit status
      
      # return a list of todays visits for a  program that are still active


      #  from front desks perspective ( exclude seen and left)   




        # try:
        #     queryset = .objects.get(pk=pk)
        # except Visit.DoesNotExist:
        #     return Response(status=status.HTTP_404_NOT_FOUND)
        # visit_serializer = VisitSerializer(queryset)
        # visits_and_services = add_availability_to_response(visit_serializer.data)    
        # return Response(visits_and_services)