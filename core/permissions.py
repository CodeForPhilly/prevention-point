
from django.contrib.auth.models import User, Group
from rest_framework import permissions
from core.models import EmployeeRole

def is_in_group(user, group_name):
  try Group.objects.get(name=group_name).user_set.filter(id=user).exists()

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