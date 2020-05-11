from rest_framework import viewsets, status
from rest_framework.response import Response
from core.models import Visit, FrontDeskEvent, FrontDeskEventType
from core.visits.serializer import VisitWithPopulationSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN, HasGroupPermission
from rest_framework.permissions import IsAuthenticated
import datetime


class QueueViewSet(viewsets.ViewSet):
    """
  API endpoint that displays the queue
  uses regular ViewSet to be able to display adjacent model responses in one view,
  hence the permission classes being repeated here instead of using viewsets.py prototype
  """

    permission_classes = [HasGroupPermission, IsAuthenticated]
    permission_groups = {"retrieve": [FRONT_DESK, CASE_MANAGER, ADMIN]}

    def retrieve(self, request, program_id=None):
        """
      retrieve most recent front desk event for each
      visit that is happening today, filtered by program
      """

        # filter by visits that are happening today in a certain program
        visits_queryset = (
            Visit.objects.select_related("participant", "program_service_map")
            .filter(
                program_service_map__program_id=program_id,
                created_at__date=datetime.date.today(),
            )
            .order_by("urgency", "-created_at")
        )

        todays_visit_data = VisitWithPopulationSerializer(
            visits_queryset, many=True, context={"request": request}
        ).data
        active_visits_queue = []

        front_desk_events = FrontDeskEvent.objects.select_related("visit").filter(
            visit__in=[dict(x)["id"] for x in todays_visit_data]
        ).order_by("-created_at").values("id", "visit", "event_type", "created_at")

        # for each visit, get the most recent front desk event, to glean current visit status
        for visit in todays_visit_data:
            events = list(
                filter(lambda x: x.get("visit") is visit.get("id"), front_desk_events)
            )
            event = events[0]

            event_type = event.get("event_type")

            if event_type in [
                FrontDeskEventType.ARRIVED.name,
                FrontDeskEventType.STEPPED_OUT.name,
                FrontDeskEventType.CAME_BACK.name,
            ]:
                # if most recent front desk event is an 'active' status add it to visit object
                visit["status"] = event
                # then add it to the 'active visits queue'
                active_visits_queue.append(visit)

        print(len(active_visits_queue))
        return Response(active_visits_queue)
