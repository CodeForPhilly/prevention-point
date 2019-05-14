from core.viewsets import ModelViewSet
from core.models import Employee
from core.employees.serializers import EmployeeSerializer

class EmployeeViewSet(ModelViewSet):
    """
    API endpoint that allows Employees to be viewed or edited
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        role = self.request.query_params.get('role', None)
        employee_id = self.request.query_params.get('employee_id', None)
        queryset = Employee.objects.all()
        if first_name is not None:
            queryset = queryset.filter(first_name__iexact=first_name)
        if last_name is not None:
            queryset = queryset.filter(last_name__iexact=last_name)
        if employee_id is not None:
            queryset = queryset.filter(id=employee_id)
        if role is not None:
            queryset = queryset.filter(role__role_value__icontains=role)

        return queryset
