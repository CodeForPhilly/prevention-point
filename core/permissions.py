from rest_framework import permissions

CASE_MANAGER = 'case manager'
FRONT_DESK = 'front desk'
ADMIN = 'admin'

class IsFrontDesk(permissions.BasePermission):
    """
    Custom permission that allows a front desk to read any resource.
    TODO/tvendetta: determine models a front desk user should
    be able to access.
    """
    def has_object_permission(self, request, view, obj):
        in_front_desk_group = request.user.groups.filter(name=FRONT_DESK).exists()
        if request.method in permissions.SAFE_METHODS and in_front_desk_group:
            return True
        else:
            return False

class IsCaseManager(permissions.BasePermission):
    """
    Custom permission that only allows case managers to view or edit an object
    """
    def has_object_permission(self, request, view, obj):
        return request.user.groups.filter(name=CASE_MANAGER).exists()
