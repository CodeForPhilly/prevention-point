from core.viewsets import ModelViewSet
from core.models import Site
from core.sites.serializer import SitesSerializer

class SitesViewSet(ModelViewSet):
    """
    API endpoint that allows Site data to be viewed or edited
    """
    queryset = Site.objects.all()
    serializer_class = SitesSerializer