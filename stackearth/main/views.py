from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Address, Team, Role, Attendance, Leave, Loan, Bonus
from .serializers import employeeSerializer, addressSerializer, roleSerializer, teamSerializer, attendanceSerializer,leaveSerializer,loanSerializer,bonusSerializer
import json
from django.views.decorators.csrf import csrf_exempt


class Get_employees_List(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serialized = employeeSerializer(employees, many=True)
        return Response(serialized.data)


def homepage(request):
    return render(request, 'Plus Admin.html')

@csrf_exempt
def showForm(request):
    return render(request,'employee.html')

@csrf_exempt
def createEmployee(request):
    data = request.body
    print(data)


# Create your views here.
