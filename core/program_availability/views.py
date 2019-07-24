from core.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from core.models import ProgramAvailability
from core.program_availability.serializer import ProgramAvailabilitySerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class ProgramAvailabilityViewSet(ModelViewSet):
    queryset = ProgramAvailability.objects.all()
    
    serializer_class = ProgramAvailabilitySerializer
    permission_groups = {
        'update': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }

    def list(self, request, program_id=None):
      availability_queryset = ProgramAvailability.objects.filter(program_id=program_id)
      if availability_queryset.exists():
        availibility_by_program = ProgramAvailabilitySerializer(availability_queryset, many=True).data
      else: 
        return Response(status=status.HTTP_404_NOT_FOUND)
      return Response(availibility_by_program)

# import pdb; pdb.set_trace()