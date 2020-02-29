from core.viewsets import ModelViewSet
from core.models import Visit, Participant
from core.visits.serializer import VisitSerializer, VisitWithPopulationSerializer
from core.permissions import FRONT_DESK, ADMIN, CASE_MANAGER
from core.models import ProgramServiceMap
from rest_framework.response import Response
from rest_framework import status


class VisitViewSet(ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """

    queryset = Visit.objects.all()
    serializer_class = VisitWithPopulationSerializer
    permission_groups = {
        "create": [FRONT_DESK, CASE_MANAGER, ADMIN],
        "list": [CASE_MANAGER, ADMIN],
        "retrieve": [CASE_MANAGER, ADMIN],
        "update": [CASE_MANAGER, ADMIN],
        "partial_update": [CASE_MANAGER, ADMIN],
    }

    def create(self, req):
        """
        post route to create new visit
        """
        # gets the corresponding mam id for the program-service pair.
        program_service_map = ProgramServiceMap.objects.get(
            service=req.data["service"], program=req.data["program"]
        )
        request_data = {
            "participant": req.data["participant"],
            "program_service_map": program_service_map.pk,
            "notes": req.data.get("notes"),
            "urgency": req.data["urgency"],
        }
        # create visit using the un-populated serializer
        visit_data = VisitSerializer(data=request_data)
        if visit_data.is_valid():
            v = visit_data.save()
            # get the new pk of the visit instance
            visit_object = Visit.objects.get(pk=v.pk)
            # pass new visit obect to populating serializer to display front end relevant data
            populated_visit = VisitWithPopulationSerializer(visit_object).data
            return Response(populated_visit, status=status.HTTP_201_CREATED)
        else:
            # TODO  better error
            return Response(visit_data.errors)

    def update(self, req, *args, **kwargs):
        """
        Update an existing visit. Must have visit and participant.  Other fields optional
        """
        try:
            visit = Visit.objects.get(pk=req.data["id"])

            print("visit before: ", visit.__dict__)

            participant = Participant.objects.get(pk=req.data["participant"])
            
            if req.data["service"] and req.data["program"]:
                program_service_map = ProgramServiceMap.objects.get(
                    service=req.data["service"], program=req.data["program"]
                )
                visit.program_service_map = program_service_map
            else:
                visit.program_service_map = visit.program_service_map

            if req.data["notes"]:
                visit.notes = req.data["notes"]
            else:
                visit.notes = visit.notes

            if req.data["urgency"]:
                visit.urgency = req.data["urgency"]
            else:
                visit.urgency = visit.urgency

            print("visit after: ", visit.__dict__)

            visit.clean()

            print("visit after clean : ", visit.__dict__)

            visit.save()

            return Response(status=status.HTTP_200_OK)

        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
