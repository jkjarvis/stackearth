from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Address, Team, Role, Attendance, Leave, Loan, Bonus
from .serializers import UserSerializer,employeeSerializer, addressSerializer, roleSerializer, teamSerializer, attendanceSerializer,leaveSerializer,loanSerializer,bonusSerializer
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Employee,Address
from datetime import date,datetime
from django.core import serializers
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, renderer_classes, permission_classes,authentication_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.db.models import Count, Case, When
from django.core.exceptions import ObjectDoesNotExist
from random import randint
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def home(request):
    first_name = request.user.first_name
    last_name = request.user.last_name
    return render(request, 'main/home.html',{'first_name': first_name,'last_name':last_name})

def loginForm(request):
    return render(request, 'main/login.html')


def emp(request):
    return render(request, 'main/emp.html')

@api_view(['GET','POST'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
@csrf_exempt
@api_view(('GET','POST',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username,password=password)
    if user != None:
        return redirect('main:home')
    else:
        response = {'message': 'Username or Password incorrect'}
        return redirect('main:loginForm')

@api_view(('GET','POST',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
@permission_classes((IsAuthenticated,))
def getUser(request):
    return Response(json.dumps({'user' : request.user.username}))

class Get_employees_List(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serialized = employeeSerializer(employees, many=True)
        return Response(serialized.data)


# @method_decorator(csrf_exempt, name='dispatch')
# @method_decorator(api_view(['POST']),name='post')
# @method_decorator(renderer_classes([TemplateHTMLRenderer, JSONRenderer]),name='post')
# class Get_attendance_List(APIView):
#     def post(self,request):
#         data = json.load(request)
#         date = data['date']
#         attendance = Attendance.objects.filter(date=date)
#         serialized = attendanceSerializer(attendance, many=True)
#         return Response(serialized.data)
        
#     def dispatch(self, *args, **kwargs):
#         return super(APIView,self).dispatch(*args, **kwargs)


@csrf_exempt
@api_view(('GET','POST',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def getAttendance(request):
        print(request.data)
        data = (request.data)
        date = data['date']
        users = User.objects.all()
        attendance = Attendance.objects.filter(date=date)
        if len(attendance) == 0:
            for i in users:
                Attendance.objects.create(user=i,date=date)
        
        attendance = Attendance.objects.filter(date=date)
        serialized = attendanceSerializer(attendance, many=True)
        return Response(serialized.data)


@csrf_exempt
def showForm(request):
    return render(request,'main/form.html')

@csrf_exempt
def createEmployee(request):
    data = json.load(request)
    print(data)
    first_name = data['firstName']
    last_name = data['lastName']
    dob = data['dob']
    email = data['email']
    ph_number = data['phone']
    address = data['address']
    salary = data['salary']
    role = data['role']
    team = data['team']
    house_number = data['house_number']
    street = data['street']
    city = data['city']
    state = data['state']
    pincode = data['pincode']

    password = User.objects.make_random_password(length=10)
    try:
        User.objects.get(username=first_name)
    except User.DoesNotExist:
        username = first_name
    else:
        username = first_name + str(randint(0,10000))

    user = User.objects.create(username=username,email=email,first_name=first_name,last_name=last_name)
    user.set_password(password)
    user.save()

    address = Address.objects.create(user=user,house_no=house_number,street=street,city=city,state=state,pincode=pincode)


    role = Role.objects.get(role='developer')
    team = Team.objects.get(team_name='backend')
    Employee.objects.create(user=user,dob=dob,email=email,phone_number=ph_number,address=address,salary=salary,role=role,team=team)

    send_mail('Reset your password',
            'Reset your password by clicking on following link, username: '+user.username+' http://127.0.0.1:8000/password_reset/password_reset/',
            'company@email.com',
            [user.email])

    return HttpResponse('ok')



def saveAttendance(request):
    data = json.load(request)
    Present = False
    if data['status'] == 'present':
        Present= True
    user = Attendance.objects.get(user=data['user'],date=data['date'])
    user.present = Present
    user.save()
    print(Present)
    return HttpResponse('ok')


def attendancePercent(request):
    data = json.load(request)
    user=2
    thirty_one = ['01','03','05','07','08','10','12']
    thirty = ['04','06','09','11']
    exception = ['02']
    date = data['date']
    gte = date[:7]+'-01'
    
    if date[5:7] in thirty_one:
        lte = date[:7]+'-31'
    elif date[5:7] in thirty:
        lte = date[5:7]+'-30'
    else:
        lte = date[5:7]+'-28'
    
    percentage = Attendance.objects.filter(user=user,date__range=[gte, lte]).aggregate(present=Count(Case(When(present=True, then=1))))
    if date[5:7] in thirty_one:
        percentage = (percentage['present']/31)*100
    elif date[5:7] in thirty:
        percentage = (percentage['present']/30)*100
    else:
        percentage = (percentage['present']/28)*100
    print(percentage)
    return HttpResponse('ok')

@api_view(('GET','POST',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
@permission_classes((IsAuthenticated,))
def leave(request):
    data = json.load(request)
    print(data)
    fromDate = data['from']
    tillDate = data['till']
    reason = data['reason']
    user = request.user
    Leave.objects.create(applicant=user,from_date=fromDate,till_date=tillDate,reason=reason)
    return Response(json.dumps({'message': 'Leave request submitted'}))


# Create your views here.
