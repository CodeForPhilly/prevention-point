from core.viewsets import ModelViewSet
from core.models import UrineDrugScreen
from core.permissions import CASE_MANAGER, ADMIN
from core.urine_drug_screens.serializers import UrineDrugScreenSerializer

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
