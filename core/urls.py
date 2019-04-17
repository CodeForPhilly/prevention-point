from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('hello/', views.HelloView.as_view(), name='hello'),
]
