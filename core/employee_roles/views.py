from rest_framework import viewsets
from core.models import EmployeeRole
from core.employee_roles.serializers import EmployeeRoleSerializer

class EmployeeRoleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Employees to be viewed or edited
    """
    queryset = EmployeeRole.objects.all()
    serializer_class = EmployeeRoleSerializer