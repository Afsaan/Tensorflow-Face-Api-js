from django.contrib import admin
from django.urls import path, include
from face_api_js import views

urlpatterns = [
    path('', views.index)
]