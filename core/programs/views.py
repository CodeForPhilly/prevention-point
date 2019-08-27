from core.viewsets import ModelViewSet
from core.models import Program
from core.programs.serializer import ProgramSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class ProgramViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_groups = {
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'update': [CASE_MANAGER, ADMIN]
    }

