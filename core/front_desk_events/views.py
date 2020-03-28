from core.viewsets import ModelViewSet
from core.models import FrontDeskEvent
from core.front_desk_events.serializer import FrontDeskEventSerializer

class FrontDeskEventViewSet(ModelViewSet):
    """
    API endpoint that allows Front Desk Events to be viewed or edited
    """
    queryset = FrontDeskEvent.objects.all()
    serializer_class = FrontDeskEventSerializer
   