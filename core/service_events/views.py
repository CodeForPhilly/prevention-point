from core.viewsets import ModelViewSet
from core.models import ServiceEvent
from core.service_events.serializer import ServiceEventSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class ServiceEventViewSet(ModelViewSet):
    """
    API endpoint that allows Service Events to be viewed or edited
    """
    queryset = ServiceEvent.objects.all()
    serializer_class = ServiceEventSerializer
    permission_groups = {
        'create':[FRONT_DESK, CASE_MANAGER, ADMIN],
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'update': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }
