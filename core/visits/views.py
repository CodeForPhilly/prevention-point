from core.viewsets import ModelViewSet
from core.models import Visit
from core.visits.serializer import VisitSerializer
from core.permissions import HasGroupPermission


class VisitViewSet(ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    permission_groups = {
        'create':['front_desk', 'admin'],
        'list': ['front_desk', 'case_manager', 'admin'],
        'retrieve': ['front_desk', 'case_manager', 'admin'],
        'update': ['front_desk', 'case_manager', 'admin'],
        'delete':['front_desk', 'admin']
    }
