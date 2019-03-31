from rest_framework import viewsets
from step.models import UrineDrugScreen
from step.urine_drug_screens.serializers import UrineDrugScreenSerializer


class UrineDrugScreenViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows UDS to be viewed or edited
    """

    queryset = UrineDrugScreen.objects.all()
    serializer_class = UrineDrugScreenSerializer
