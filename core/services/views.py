from core.models import Service
from core.viewsets import ModelViewSet
from core.services.serializers import ServiceSerializer
from rest_framework.exceptions import NotFound

class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


    def get_queryset(self):
        slug = self.request.query_params.get('slug', None)
        queryset = Service.objects.all()
        if slug is not None:
            queryset = queryset.filter(slug__iexact=slug)
        if not queryset.exists():
            raise NotFound()
        return queryset
