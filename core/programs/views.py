from core.viewsets import ModelViewSet
from rest_framework.response import Response
from core.models import Program
from core.programs.serializer import ProgramSerializer
from core.services.serializers import ServiceSerializer


class ProgramViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
