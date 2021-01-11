from django.urls import path
from main import views

urlpatterns = [
    path('', views.homepage),
    path('employee', views.Get_employees_List.as_view()),
    path('form',views.showForm),
    path('createEmployee',views.createEmployee,name='create_emp'),
]