"""preventionpoint URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view
from rest_framework_simplejwt import views as jwt_views

from core.users import views as user_views
from core.urine_drug_screens import views as uds_views
from core.participants import views as participant_views
from core.visits import views as visits_views
from core.front_desk_events import views as front_events_views
from core.programs import views as programs_views
from core.services import views as services_views
from core.queue import views as queues_views
from core.program_availability import views as program_availability_views
from core.program_service_map import views as program_service_map_views
from core.insurers import views as insurer_views
from core.medications import views as medications_views

admin.site.site_header = "Prevention Point Philadelphia"

router = routers.DefaultRouter()
router.register(r"users", user_views.UserViewSet)
router.register(r"groups", user_views.GroupViewSet)
router.register(r"visits", visits_views.VisitViewSet)
router.register(r"uds", uds_views.UrineDrugScreenViewSet)
router.register(r"medications", medications_views.MedicationViewSet)
router.register(r"participants", participant_views.ParticipantViewSet)
router.register(r"front-desk-events", front_events_views.FrontDeskEventViewSet)
router.register(r"programs", programs_views.ProgramViewSet)
router.register(r"program-service-map", program_service_map_views.ProgramServiceMapView)
router.register(r"services", services_views.ServiceViewSet)
router.register(r"insurers", insurer_views.InsurerViewSet)


schema_view = get_swagger_view(title="PreventionPoint API")

urlpatterns = [
    path("api/", include(router.urls)),
    path(
        "api/token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "api/token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"
    ),
    path("api/token/verify/", jwt_views.TokenVerifyView.as_view(), name="token_verify"),
    path(
        "api/programs/<int:program_id>/program-availability/",
        program_availability_views.ProgramAvailabilityViewSet.as_view({"get": "list"}),
    ),
    path(
        "api/programs/<int:program_id>/program-availability/<int:pk>/",
        program_availability_views.ProgramAvailabilityViewSet.as_view(
            {"put": "update"}
        ),
    ),
    path(
        "api/programs/<int:program_id>/queue/",
        queues_views.QueueViewSet.as_view({"get": "retrieve"}),
    ),
    # above only 'registers' the retrieve path. to use other CRUD actions, must pass that explicitly to .as_view in another register
    path("swagger/", schema_view),
    path("admin/", admin.site.urls),
]
