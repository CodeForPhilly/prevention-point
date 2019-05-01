from django.urls import path, include
from rest_framework.routers import DefaultRouter

from core import views
from core.visits.views import VisitViewSet
from core.service_events.views import ServiceEventViewSet

router = DefaultRouter()
router.register(r'visits', VisitViewSet)
router.register(r'service-events', ServiceEventViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('hello/', views.HelloView.as_view(), name='hello'),

    path('', include(router.urls))
]
