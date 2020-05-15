from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status

from core.viewsets import ModelViewSet
from core.models import Visit
from core.visits.serializer import VisitSerializer, VisitWithPopulationSerializer
from core.models import ProgramServiceMap


class VisitViewSet(ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """

    queryset = Visit.objects.all()
    serializer_class = VisitWithPopulationSerializer

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
        Update an existing visit for program, service, urgency, notes
        """
        update_data = {}
        try:
            if "pk" in kwargs:
                visit = Visit.objects.get(pk=kwargs["pk"])
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            if "service" in req.data and "program" in req.data:
                program_service_map = ProgramServiceMap.objects.get(
                    service=req.data["service"], program=req.data["program"]
                )
                update_data["program_service_map"] = program_service_map.id

            if "notes" in req.data:
                update_data["notes"] = req.data["notes"]

            if "urgency" in req.data:
                update_data["urgency"] = req.data["urgency"]

            visit_data = VisitSerializer(visit, update_data, partial=True)

            if visit_data.is_valid():
                visit_data.save()
                populated_visit = VisitWithPopulationSerializer(visit, context={'request': req}).data
                return Response(populated_visit, status=status.HTTP_200_OK)
            else:
                # TODO  better error
                return Response(visit_data.errors)

        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
