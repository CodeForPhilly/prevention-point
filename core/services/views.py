from core.models import Service
from core.viewsets import ModelViewSet
from core.services.serializers import ServiceSerializer

class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
