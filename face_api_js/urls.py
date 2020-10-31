from django.contrib import admin
from django.urls import path, include
from face_api_js import views

urlpatterns = [
    path('', views.index),
    path('mtcnn', views.mtcnn),
    path('tiny', views.tiny),
    path('ssd', views.ssd),
    path('landmark', views.landmark),
    path('emotion', views.emotion),

    
]