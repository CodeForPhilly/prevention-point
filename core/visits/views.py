from rest_framework import viewsets
from core.models import Visit
from core.visits.serializer import VisitSerializer
from core.permissions import FrontDesk


class VisitViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer

    def check_permissions(self):
        self.permission_classes = [FrontDesk]