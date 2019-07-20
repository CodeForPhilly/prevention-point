from core.viewsets import ModelViewSet
from core.models import ProgramAvailability
from core.program_availability.serializer import ProgramAvailabilitySerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class ProgramAvailabilityViewSet(ModelViewSet):
    queryset = ProgramAvailability.objects.all()
    serializer_class = ProgramAvailabilitySerializer
    permission_groups = {
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }

