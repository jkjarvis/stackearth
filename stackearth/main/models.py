from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver


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
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    house_no = models.CharField(max_length=20)
    street = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    pincode = models.CharField(max_length=6)

    def __str__(self):
        return str(self.user)


class Employee(models.Model):
    user = models.ForeignKey(User,default=None,on_delete=models.CASCADE,null=True)
    dob = models.DateField(null=True)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=10)
    address = models.ForeignKey(Address, on_delete=models.CASCADE,null=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE,null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE,null=True)
    salary = models.CharField(max_length=10)

    def __str__(self):
        return str(self.user)

class Attendance(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=200,blank=True)
    date = models.DateField()
    present = models.BooleanField(default=True)

    def __str__(self):
        return str(self.user)

@receiver(pre_save, sender=Attendance)
def add_name(sender, instance, **kwargs):
    instance.name = instance.user.first_name


class Leave(models.Model):
    applicant = models.ForeignKey(User,on_delete=models.CASCADE)
    from_date = models.DateTimeField()
    till_date = models.DateTimeField()
    reason = models.TextField(max_length=300)
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)


class Loan(models.Model):
    applicant = models.ForeignKey(User,on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    start_date = models.DateField()
    pay_upto = models.DateField()
    confirmation = models.BooleanField(default=False)

    def __str__(self):
        return str(self.applicant)


class Bonus(models.Model):
    applicant = models.ForeignKey(User,on_delete=models.CASCADE)
    confirmation = models.BooleanField(default=False)

    def __str__(self):
        return str(self.applicant)







    













