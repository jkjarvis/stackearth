from django.urls import path,include
from main import views
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView

urlpatterns = [
    path('home', views.home,name='home'),
    path('',views.loginForm,name='loginForm'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
    path('login',views.login),
    path('logout',views.logout,name='logout'),
    path('emp',views.emp),
    path('currentuser',views.current_user),
    # path('currentuser',views.current_user),
    path('employee', views.Get_employees_List.as_view()),
    path('createEmployee',views.createEmployee,name='create_emp'),
    path('getAttendance',csrf_exempt(views.getAttendance),name='get_attendance'),
    path('saveAttendance',views.saveAttendance,name='save_attendance'),
    path('attendancePercent',views.attendance_percent,name='attendance_percent'),
    path('leave',views.leave),
    path('leave_requests',views.leave_requests),
    path('leave_status',views.leave_status),
    path('leave_approve',views.leave_approve),
    path('password_reset/', include('django.contrib.auth.urls'),name='password_reset'),
    path('attendancePage',TemplateView.as_view(template_name="main/attendance.html"),name='attendancePage'),
    path('leaveApprovePage',TemplateView.as_view(template_name="main/leaveApprove.html"),name='leaveApprovePage'),
    path('leaveRequestPage',TemplateView.as_view(template_name="main/leaveRequest.html"),name='leaveRequestPage'),
    path('leaveStatusPage',TemplateView.as_view(template_name="main/leaveStatus.html"),name='leaveStatusPage'),
    path('roleTeamPage',TemplateView.as_view(template_name="main/add_team_role.html"),name='roleTeamPage'),    
    path('search',TemplateView.as_view(template_name="main/Search.html"),name='search'),        
    path('saveTeam',views.save_team),
    path('saveRole',views.save_role),
    path('getTeams',views.get_teams),
    path('getRoles',views.get_roles),
    path('searchEmployee',views.searchEmployee),
    path('searchEmployeeByTeam',views.searchEmployeeByTeam),
    path('searchEmployeeByRole',views.searchEmployeeByRole),
]