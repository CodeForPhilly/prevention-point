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
from core.service_events import views as service_events_views
from core.programs import views as programs_views
from core.services import views as services_views


admin.site.site_header = 'Prevention Point Philadelphia'

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'groups', user_views.GroupViewSet)
router.register(r'visits', visits_views.VisitViewSet)
router.register(r'uds', uds_views.UrineDrugScreenViewSet)
router.register(r'participants', participant_views.ParticipantViewSet)
router.register(r'visits', visits_views.VisitViewSet)
router.register(r'service-events', service_events_views.ServiceEventViewSet, basename='service-event')
router.register(r'programs', programs_views.ProgramViewSet)
router.register(r'services', services_views.ServiceViewSet)

schema_view = get_swagger_view(title='PreventionPoint API')



urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    path('admin/', admin.site.urls),
]