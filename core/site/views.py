from core.viewsets import ModelViewSet
from core.models import Site
from core.site.serializer import SiteSerializer

class SiteViewSet(ModelViewSet):
    """
    API endpoint that allows Site data to be viewed or edited
    """
    queryset = Site.objects.all()
    serializer_class = SiteSerializer