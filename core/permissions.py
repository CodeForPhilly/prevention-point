from django.contrib.auth.models import User, Group
from rest_framework.permissions import DjangoModelPermissions, BasePermission

FRONT_DESK = 'front_desk'
CASE_MANAGER = 'case_manager'
ADMIN = 'admin'

class DjangoModelPermissions(DjangoModelPermissions):
    """
    The request is authenticated using `django.contrib.auth` permissions.
    See: https://docs.djangoproject.com/en/dev/topics/auth/#permissions
    It ensures that the user is authenticated, and has the appropriate
    `add`/`change`/`delete` permissions on the model.
    This permission can only be applied against view classes that
    provide a `.queryset` attribute.


    Prevention Point Note: We are extending this Class as to include permission checks on GET
    requests. You MUST use this class to protect GET requests to endpoints. The DRF class this 
    ineherits from does not protect GET requests
    """
    perms_map = {
        'OPTIONS': [],
        'HEAD': [],
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    
    }
