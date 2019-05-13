from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics
from core.users.serializers import UserSerializer, GroupSerializer
from core.permissions import HasGroupPermission


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [HasGroupPermission]
    permission_groups = {
        'create':['admin'], #POST
        'retrieve': ['admin'], #GET one
        'update': ['admin'], #PATCH
        'list': ['admin'] #GET all
        # 'delete':['front_desk', 'admin'] no one can delete, with no delete permission
    }


class UserListView(generics.ListAPIView):
    """
    Read-only endpoint for listing employees(users)
    """
    serializer_class = UserSerializer
    permission_classes = [HasGroupPermission]
    action = 'list'
    permission_groups = {
        'list':['admin']
    }

    def get_queryset(self):
        username =  self.request.query_params.get('username', None)
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        groups = self.request.query_params.get('groups', None)
        pk = self.request.query_params.get('pk', None)
        queryset = User.objects.all()
        if username is not None:
            queryset = queryset.filter(first_name__iexact=username)
        if first_name is not None:
            queryset = queryset.filter(first_name__iexact=first_name)
        if last_name is not None:
            queryset = queryset.filter(last_name__iexact=last_name)
        if pk is not None:
            queryset = queryset.filter(id=pk)
        if groups is not None:
            queryset = queryset.filter(role__role_value__icontains=groups)

        return queryset


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [HasGroupPermission]
    permission_groups = {
        'create':['admin'], #POST
        'retrieve': ['admin'], #GET one
        'update': ['admin'], #PATCH
        'list': ['admin'] #GET all
        # 'delete':['front_desk', 'admin'] no one can delete, with no delete permission
    }