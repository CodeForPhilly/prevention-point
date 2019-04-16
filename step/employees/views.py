from rest_framework import viewsets
from step.models import Employee
from step.employees.serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Employees to be viewed or edited
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
