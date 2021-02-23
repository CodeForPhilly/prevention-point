from core.viewsets import ModelViewSet
from core.models import SepEnrollment
from core.sep_enrollment.serializers import SepEnrollmentSerializer

class SepEnrollmentViewSet(ModelViewSet):
    queryset = SepEnrollment.objects.all()
    serializer_class = SepEnrollmentSerializer
