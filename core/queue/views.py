from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from core.models import Program, Visit, FrontDeskEvent, FrontDeskEventType
from core.visits.serializer import VisitForQueueSerializer
from core.front_desk_events.serializer import FrontDeskEventForQueueSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN, HasGroupPermission
from rest_framework.permissions import IsAuthenticated
import datetime

class QueueViewSet(viewsets.ViewSet):
  
  """
  API endpoint that displays the queue
  uses regular ViewSet to be able to display adjacent model responses in one view, 
  hence the permission classes being repeated here instead of using viewsets.py prototypw
  """

  permission_classes = [HasGroupPermission, IsAuthenticated]
  permission_groups = {
      'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN]
  }
  
  def retrieve(self, request, program_id=None):
      """
      retrieve most recent front desk event for each 
      visit that is happening today, filtered by program
      """
      
      # filter by visits that are happening today in a certain program
      visits_queryset = Visit.objects.filter(program_id=program_id, created_at__date=datetime.date.today())
     
      if visits_queryset.exists():
        todays_visit_data = VisitForQueueSerializer(visits_queryset, many=True).data
      else: 
        return Response(status=status.HTTP_404_NOT_FOUND)
      
      active_visits_queue = []
      # for each visit, get the most recent front desk event, to glean current visit status
      for visit in todays_visit_data:
        front_desk_events_queryset = FrontDeskEvent.objects.filter(visit_id=visit['id']).order_by('-created_at') # -created_at for 'decending'
       
        # checks to see if visit has front desk events before proceeding. may cause silent failure
        if front_desk_events_queryset.exists():  
       
          visit_event_data = FrontDeskEventForQueueSerializer(front_desk_events_queryset, many=True).data 
          event_type = visit_event_data[0]['event_type']
          
          if event_type in (FrontDeskEventType.ARRIVED.name, FrontDeskEventType.STEPPED_OUT.name, FrontDeskEventType.CAME_BACK.name):
            # if most recent front desk event is an 'active' status add it to visit object
            visit['status'] = visit_event_data[0]
            # then add it to the 'active visits queue'
            active_visits_queue.append(visit)
          
      return Response(active_visits_queue)