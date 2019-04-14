from rest_framework import viewsets
from step.models import EmployeeRole
from step.employee_roles.serializers import EmployeeRoleSerializer

class EmployeeRoleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Employees to be viewed or edited
    """
    queryset = EmployeeRole.objects.all()
    serializer_class = EmployeeSerializer