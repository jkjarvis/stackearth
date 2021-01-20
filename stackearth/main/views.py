from django.shortcuts import render
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
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.db.models import Count, Case, When



def home(request):
    return render(request, 'main/home.html')

@api_view(['GET','POST'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


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
    name = data['name']
    age = data['dob']
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
    user = User.objects.create(username=name,email=email,first_name=name)
    user.set_password(password)
    user.save()

    address = Address.objects.create(user=user,house_no=house_number,street=street,city=city,state=state,pincode=pincode)



    Employee.objects.create(name=name,age=age,email=email,phone_number=ph_number,address=address,salary=salary,role=role,team=team)

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

def leave(request):
    data = json.load(request)
    print(data)
    return HttpResponse('ok')


# Create your views here.
