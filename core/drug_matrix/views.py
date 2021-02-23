from core.viewsets import ModelViewSet
from core.models import DrugMatrix
from core.drug_matrix.serializers import DrugMatrixSerializer

class DrugMatrixViewSet(ModelViewSet):
    queryset = DrugMatrix.objects.all()
    serializer_class = DrugMatrixSerializer