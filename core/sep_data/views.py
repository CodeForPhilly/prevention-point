from core.viewsets import ModelViewSet
from core.models import SepData
from core.sep_data.serializers import SepDataSerializer

class Sep_DataViewSet(ModelViewSet):
    queryset = SepData.objects.all()
    serializer_class = SepDataSerializer
