from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from core.permissions import HasGroupPermission

class ModelViewSet(viewsets.ModelViewSet):
    permission_classes = []#[HasGroupPermission, IsAuthenticated]
