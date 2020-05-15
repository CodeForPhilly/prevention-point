from core.models import Medication
from core.viewsets import ModelViewSet
from core.medications.serializers import MedicationSerializer

class MedicationViewSet(ModelViewSet):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
