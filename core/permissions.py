from django.contrib.auth.models import User, Group
from rest_framework import permissions

FRONT_DESK = 'front_desk'
CASE_MANAGER = 'case_manager'
ADMIN = 'admin'


def is_in_group(user, group_name):
    try:
        return Group.objects.get(name=group_name).user_set.filter(id=user.id).exists()
    except Group.DoesNotExist:
        return False

class HasGroupPermission(permissions.BasePermission):
  """
    checks view to see if user has access to the action
  """
  def has_permission(self, request, view):
    required_groups = view.permission_groups.get(view.action)
    if required_groups == None:
        return False
    else:
        return any([is_in_group(request.user, group_name) for group_name in required_groups])

#https://gist.github.com/leonardo-/b348e6c607b91ddef586e7262481dfcc
