from core.viewsets import ModelViewSet
from rest_framework.response import Response
from core.models import Program, Program
from core.programs.serializer import ProgramSerializer
from core.services.serializers import ServiceSerializer


class ProgramViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


    def get_queryset(self):
        slug = self.request.query_params.get('slug', None)
        queryset = Program.objects.all()
        if slug is not None:
            queryset = queryset.filter(slug__iexact=slug)
        if not queryset.exists():
            raise NotFound()
        return queryset
