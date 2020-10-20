from core.viewsets import ModelViewSet
from core.models import SepData
from core.sep_data.serializers import Sep_DataSerializer

class Sep_DataViewSet(ModelViewSet):
    queryset = SepData.objects.all()
    serializer_class = Sep_DataSerializer
