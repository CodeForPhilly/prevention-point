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
    permission_roles = {
        'create':['front desk', 'admin'],
        'retrieve': ['front desk', 'case manager', 'admin']
    }