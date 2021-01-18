from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Address, Team, Role, Attendance, Leave, Loan, Bonus
from .serializers import employeeSerializer, addressSerializer, roleSerializer, teamSerializer, attendanceSerializer,leaveSerializer,loanSerializer,bonusSerializer
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Employee,Address
from datetime import date,datetime
from django.core import serializers
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer




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
        attendance = Attendance.objects.filter(date=date)
        print(attendance)
        serialized = attendanceSerializer(attendance, many=True)
        return Response(json.dumps(serialized.data))
        
    


def homepage(request):
    return render(request, 'main/index.html')

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


@csrf_exempt
def attendance(request):
    data = json.load(request)
    print(data)
    date = datetime.now()
    status = data['status']
    return HttpResponse('ok')

def home(request):
    return render(request, 'main/index.html')

# Create your views here.
