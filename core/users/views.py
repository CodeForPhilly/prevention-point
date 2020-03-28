from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from core.users.serializers import UserSerializer, GroupSerializer
from core.viewsets import ModelViewSet


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def get_queryset(self):
        username =  self.request.query_params.get('username', None)
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        groups = self.request.query_params.get('groups', None)
        pk = self.request.query_params.get('pk', None)
        queryset = User.objects.all()
        if username is not None:
            queryset = queryset.filter(username__iexact=username)
        if first_name is not None:
            queryset = queryset.filter(first_name__iexact=first_name)
        if last_name is not None:
            queryset = queryset.filter(last_name__iexact=last_name)
        if pk is not None:
            queryset = queryset.filter(id=pk)
        if groups is not None:
            queryset = queryset.filter(role__role_value__icontains=groups)

        return queryset

class GroupViewSet(ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


