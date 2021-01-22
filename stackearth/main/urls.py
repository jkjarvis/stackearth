from django.urls import path,include
from main import views
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('home', views.home,name='home'),
    path('',views.loginForm,name='loginForm'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
    path('login',views.login),
    path('emp',views.emp),
    path('currentuser',views.current_user),
    # path('currentuser',views.current_user),
    path('employee', views.Get_employees_List.as_view()),
    path('form',views.showForm),
    path('createEmployee',views.createEmployee,name='create_emp'),
    path('getAttendance',csrf_exempt(views.getAttendance),name='get_attendance'),
    path('saveAttendance',views.saveAttendance,name='save_attendance'),
    path('attendancePercent',views.attendance_percent,name='attendance_percent'),
    path('leave',views.leave),
    path('leave_requests',views.leave_requests),
    path('leave_status',views.leave_status),
    path('password_reset/', include('django.contrib.auth.urls'),name='password_reset'),
]