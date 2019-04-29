from django.urls import path, include
from rest_framework.routers import DefaultRouter

from core import views
from core.visits.views import VisitViewSet

router = DefaultRouter()
router.register(r'visits', VisitViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('hello/', views.HelloView.as_view(), name='hello'),

    path('', include(router.urls))
]
