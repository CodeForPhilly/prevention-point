from django.test import TestCase

from .models import Employee

class EmployeeModelTest(TestCase):
    def test_string_representation(self):
        employee = Employee(username="test-user")
        self.assertEqual(str(employee), employee.username)
