from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


def index(request):
    return HttpResponse("Hello, Prevention Point.")

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message', 'Hello, Prevention Point (from rest framework)'}
        return Response(content)
