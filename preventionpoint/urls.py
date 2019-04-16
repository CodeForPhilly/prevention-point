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

from rest_framework_simplejwt import views as jwt_views
from step.users import views as user_views
from step.urine_drug_screens import views as uds_views
from step.participants import views as participant_views
from step.employees import views as employee_views
from step.employee_roles import views as employee_roles_views

admin.site.site_header = 'Prevention Point Philadelphia'

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'groups', user_views.GroupViewSet)
router.register(r'uds', uds_views.UrineDrugScreenViewSet)
router.register(r'participants', participant_views.ParticipantViewSet)
router.register(r'employees', employee_views.EmployeeViewSet)
router.register(r'employee_roles', employee_roles_views.EmployeeRoleViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('step/', include('step.urls')),
    path('admin/', admin.site.urls),
]
