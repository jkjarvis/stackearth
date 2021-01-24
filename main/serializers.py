from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Employee, Address, Team, Role, Attendance, Leave, Loan, Bonus


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class employeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class addressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class teamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class roleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class attendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class leaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = '__all__'


class loanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'


class bonusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bonus
        fields = '__all__'

