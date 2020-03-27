from core.viewsets import ModelViewSet
from core.models.insurer import Insurer
from core.insurers.serializers import InsurerSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class InsurerViewSet(ModelViewSet):
    queryset = Insurer.objects.all()
    serializer_class = InsurerSerializer


