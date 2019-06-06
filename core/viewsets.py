from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from core.permissions import HasGroupPermission
import os

class ModelViewSet(viewsets.ModelViewSet):
    if os.getenv("SKIP_PERMISSIONS") == "yes":
        permission_classes = []
    else:
        permission_classes = [HasGroupPermission, IsAuthenticated]
