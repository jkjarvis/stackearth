from django.urls import path
from main import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.home,name='home'),
    path('currentuser',views.current_user),
    path('employee', views.Get_employees_List.as_view()),
    path('form',views.showForm),
    path('createEmployee',views.createEmployee,name='create_emp'),
    path('getAttendance',csrf_exempt(views.getAttendance),name='get_attendance'),
    path('saveAttendance',views.saveAttendance,name='save_attendance'),
    path('attendancePercent',views.attendancePercent,name='attendance_percent'),
    path('leave',views.leave),
]