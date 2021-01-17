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


class Get_employees_List(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serialized = employeeSerializer(employees, many=True)
        return Response(serialized.data)


def home(request):
    return render(request, 'main/home.html')

def base(request):
    return render(request,'main/base.html')

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
    user = User.objects.create(username=name,email=email)
    user.set_password(password)
    user.save()

    address = Address.objects.create(user=user,house_no=house_number,street=street,city=city,state=state,pincode=pincode)



    Employee.objects.create(name=name,age=age,email=email,phone_number=ph_number,address=address,salary=salary,role=role,team=team)

    return HttpResponse('ok')

# Create your views here.
