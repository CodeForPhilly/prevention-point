from core.viewsets import ModelViewSet
from core.models import Visit
from core.visits.serializer import VisitSerializer
from core.permissions import FRONT_DESK, ADMIN, CASE_MANAGER
from core.models import ProgramServiceMap , Participant
from rest_framework.response import Response


class VisitViewSet(ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    permission_groups = {
        'create':[FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [CASE_MANAGER, ADMIN],
        'retrieve': [CASE_MANAGER, ADMIN],
        'update': [CASE_MANAGER, ADMIN]
    }

    def create(self, req):
        program_service_map = ProgramServiceMap.objects.get(service=req.data['service'], program=req.data['program'])

        participant = Participant.objects.get(pk=req.data['participant'])
        visit_data = {"participant": req.data['participant'], "program_service_map": program_service_map.pk
        }
        new_visit = VisitSerializer(data=visit_data)
        if new_visit.is_valid():
            print('hey')
            new_visit.save()
            return Response(new_visit.data)
        else:
            return Response(new_visit.errors)
# TODO  can the list function populte