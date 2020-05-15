from core.viewsets import ModelViewSet
from rest_framework.response import Response
from core.models import Program, ProgramServiceMap, Service
from core.programs.serializer import ProgramSerializer
from core.services.serializers import ServiceSerializer


def build_service_list(subset):
    service_list = []
    for map_object in subset:
        service_object = Service.objects.get(pk=map_object.service_id)
        service = ServiceSerializer(service_object).data
        service_list.append(service)
    return service_list


class ProgramViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def list(self, request):
        programs = Program.objects.all()
        service_populated_programs = []
        for p in programs:
            program = ProgramSerializer(p).data
            service_subset = ProgramServiceMap.objects.filter(program=program["id"])
            program["services"] = build_service_list(service_subset)
            service_populated_programs.append(program)
        return Response(service_populated_programs)

    def retrieve(self, request, pk=None):
        p = Program.objects.get(pk=pk)
        program = ProgramSerializer(p).data
        service_subset = ProgramServiceMap.objects.filter(program=program["id"])
        program["services"] = build_service_list(service_subset)
        return Response(program)
