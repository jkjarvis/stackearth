from django.contrib import admin
from .models import Employee,Address,Role,Team

# Register your models here.
admin.site.register(Employee)
admin.site.register(Address)
admin.site.register(Role)
admin.site.register(Team)