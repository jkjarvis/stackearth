from django.urls import path
from main import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.home,name='home'),
    path('employee', views.Get_employees_List.as_view()),
    path('form',views.showForm),
    path('createEmployee',views.createEmployee,name='create_emp'),
    path('getAttendance',csrf_exempt(views.getAttendance),name='get_attendance'),
]