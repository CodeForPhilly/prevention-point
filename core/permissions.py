
from django.contrib.auth.models import User, Group
from rest_framework import permissions
from core.models import EmployeeRole

class FrontDesk(permissions.BasePermission):
  """
  Basic Permission for front desk tasks
  """
  def has_permission(self, request, view):
    front_desk_id = EmployeeRole.objects.values_list('pk', flat=True).get(role_value='front desk')
    if request.user.role == front_desk_id:
      return True
    return False
  
  # TODO: above class will deny access to the 