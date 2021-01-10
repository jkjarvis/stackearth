from django.urls import path
from main import views

urlpatterns = [
    path('', views.home,name='home'),
    path('employee', views.Get_employees_List.as_view()),
]