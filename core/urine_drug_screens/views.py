from core.viewsets import ModelViewSet
from core.permissions import CASE_MANAGER, ADMIN

from .models import UrineDrugScreen
from .serializers import UrineDrugScreenSerializer

class UrineDrugScreenViewSet(ModelViewSet):
    """
    API endpoint that allows UDS to be viewed or edited
    """
    queryset = UrineDrugScreen.objects.all()
    serializer_class = UrineDrugScreenSerializer
    permission_groups = {
        'create':[CASE_MANAGER, ADMIN],
        'retrieve': [CASE_MANAGER, ADMIN],
        'update': [CASE_MANAGER, ADMIN],
        'list': [CASE_MANAGER, ADMIN]
    }
