from rest_framework import viewsets
from core.models import UrineDrugScreen
from core.urine_drug_screens.serializers import UrineDrugScreenSerializer

class UrineDrugScreenViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows UDS to be viewed or edited
    """
    queryset = UrineDrugScreen.objects.all()
    serializer_class = UrineDrugScreenSerializer
