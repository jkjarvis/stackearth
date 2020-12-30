from django.db import models


class Team(models.Model):
    team_name = models.CharField(max_length=30)
    current_members = models.IntegerField(default=0)

    def __str__(self):
        return team_name


class Role(models.Model):
    role = models.CharField(max_length=30)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    current_employed = models.IntegerField(default=0,max_length=10)
    vacancy = models.IntegerField(default=0, max_length=10)

    def __str__(self):
        return self.role


class Address(models.Model):
    house_no = models.CharField(max_length=20)
    street = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    pincode = models.CharField(max_length=6)

    def __str__(self):
        return str(self.employee)


class Employee(models.Model):
    name = models.CharField(max_length=50)
    age = models.CharField(max_length=2)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=10)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    salary = models.CharField(max_length=10)

    def __str__(self):
        return self.name
    













