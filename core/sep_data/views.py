from core.viewsets import ModelViewSet
from core.models import Sep_Data
from core.sep_data.serializers import Sep_DataSerializer

class Sep_DataViewSet(ModelViewSet):
    queryset = Sep_Data.objects.all()
    serializer_class = Sep_DataSerializer
