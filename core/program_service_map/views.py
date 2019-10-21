from core.viewsets import ModelViewSet
from core.models import ProgramServiceMap
from core.program_service_map.serializer import ProgramServiceMapSerializer
from core.permissions import FRONT_DESK, ADMIN, CASE_MANAGER

class ProgramServiceMapView(ModelViewSet):
    """
    endpoint for map objects mapping which service belong to what programs
    """
    queryset = ProgramServiceMap.objects.all()
    serializer_class = ProgramServiceMapSerializer
    permission_groups = {
        'create':[CASE_MANAGER, ADMIN],
        'list': [CASE_MANAGER, ADMIN],
        'retrieve': [CASE_MANAGER, ADMIN],
    }
