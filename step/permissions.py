from rest_framework import permissions

class IsCaseManager(permissions.BasePermission):
    """
    Custom permission that only allows case managers to view or edit an object
    """

    def has_object_permission(self, request, view, obj):
        return request.user.groups.filter(name='case manager').exists()
