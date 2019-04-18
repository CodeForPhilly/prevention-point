from core.models import EmployeeRole
from rest_framework import serializers

class EmployeeRoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EmployeeRole
        fields = ('role_value',)