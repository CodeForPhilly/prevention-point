from core.models import Employee
from rest_framework import serializers

# class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
class EmployeeSerializer(serializers.ModelSerializer):
    role = serializers.SlugRelatedField(many=False, read_only=True, slug_field='role_value')

    class Meta:
        model = Employee
        fields = ('first_name', 'last_name', 'role')
