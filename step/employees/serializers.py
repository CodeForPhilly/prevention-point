from step.models import Employee
from rest_framework import serializers

class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Employee
        fields = ('first_name', 'last_name', 'role')
