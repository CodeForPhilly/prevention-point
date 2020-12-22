from core.viewsets import ModelViewSet
from core.models import SepData
from core.sep_data.serializers import SepDataSerializer

class Sep_DataViewSet(ModelViewSet):
    serializer_class = SepDataSerializer

    def get_queryset(self):
        visit_id = self.request.query_params.get('visit_id', None)
        queryset = SepData.objects.all()
        if visit_id is not None:
            queryset = queryset.filter(visit_id=visit_id)
        return queryset
