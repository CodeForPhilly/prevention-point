from core.viewsets import ModelViewSet
from core.models import Visit
from core.visits.serializer import VisitSerializer
from core.permissions import FRONT_DESK, ADMIN, CASE_MANAGER

class VisitViewSet(ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    permission_groups = {
        'create':[FRONT_DESK, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'update': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }
