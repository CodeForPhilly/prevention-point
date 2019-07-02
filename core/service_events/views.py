from core.viewsets import ModelViewSet
from core.models import ServiceEvent
from core.service_events.serializer import ServiceEventSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class ServiceEventViewSet(ModelViewSet):
    queryset = ServiceEvent.objects.all()
    serializer_class = ServiceEventSerializer
    permission_groups = {
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }

