from rest_framework import viewsets
from core.models import Visit
from core.visits.serializer import VisitSerializer
from core.permissions import HasGroupPermission


class VisitViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    permission_classes = [HasGroupPermission]
    permission_groups = {
        'create':['front_desk', 'admin'],
        'list': ['front_desk', 'case manager', 'admin'],
        'retrieve': ['front_desk', 'case manager', 'admin'],
        'update': ['front_desk', 'case manager', 'admin'],
        'delete':['front_desk', 'admin']
    }