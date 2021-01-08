from django.contrib import admin
from .models import Employee,Address,Role,Team,Attendance,Loan,Leave,Bonus

# Register your models here.
admin.site.register(Employee)
admin.site.register(Address)
admin.site.register(Role)
admin.site.register(Team)
admin.site.register(Attendance)
admin.site.register(Loan)
admin.site.register(Leave)
admin.site.register(Bonus)