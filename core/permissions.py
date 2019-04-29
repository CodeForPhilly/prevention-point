
from django.contrib.auth.models import User, Group
from rest_framework import permissions
from core.models import EmployeeRole

def check_employee_role(user, role_name):
  front_desk_id = EmployeeRole.objects.values_list('pk', flat=True).get(role_value=role_name)
  if user.role ==front_desk_id:
    return True
  return False

class HasGroupPermission(permissions.BasePermission):
  """
  Basic Permission for front desk tasks
  """
  def has_permission(self, request, view):
    required_roles = view.permission_roles.get(view.action)
    if required_roles ==None:
    		return False	
    else:
      return any([check_employee_role(request.user, role_name) for role_name in required_roles])

  
#https://gist.github.com/leonardo-/b348e6c607b91ddef586e7262481dfcc