from core.viewsets import ModelViewSet
from core.models import Visit
from core.visits.serializer import VisitSerializer, PopulatedVisitSerializer


class VisitViewSet(ModelViewSet):
    """
    API endpoint that allows Visits to be viewed or edited
    """

    queryset = Visit.objects.all()

    def get_serializer_class(self):
        """
        override default serializer_class attribute to use unpopulated serializer for saving to db
        to avoid needing the entire participant object to post
        """
        if self.request.method in ["GET"]:
            return PopulatedVisitSerializer
        return VisitSerializer
