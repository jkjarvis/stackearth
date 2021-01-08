from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Address, Team, Role, Attendance, Leave, Loan, Bonus
from .serializers import employeeSerializer, addressSerializer, roleSerializer, teamSerializer, attendanceSerializer,leaveSerializer,loanSerializer,bonusSerializer


class Get_employees_List(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serialized = employeeSerializer(employees, many=True)
        return Response(serialized.data)


def homepage(request):
    return render(request, 'index.html')

# Create your views here.
