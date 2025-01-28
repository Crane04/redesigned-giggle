from django.urls import path
from .views import CompareImageView

urlpatterns = [
    path('compare-images/', CompareImageView.as_view()),
]