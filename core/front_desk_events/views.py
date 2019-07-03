from core.viewsets import ModelViewSet
from core.models import FrontDeskEvent
from core.front_desk_events.serializer import FrontDeskEventSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class FrontDeskEventViewSet(ModelViewSet):
    """
    API endpoint that allows Front Desk Events to be viewed or edited
    """
    queryset = FrontDeskEvent.objects.all()
    serializer_class = FrontDeskEventSerializer
    permission_groups = {
        'create':[FRONT_DESK, CASE_MANAGER, ADMIN],
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'update': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }
