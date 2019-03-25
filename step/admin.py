from django.contrib import admin
from .models import Participant, Medication, UrineDrugScreen, CaseManagement, Appointment, Employee

# Register your models here.
admin.site.register(Participant)
admin.site.register(Medication)
admin.site.register(UrineDrugScreen)
admin.site.register(CaseManagement)
admin.site.register(Appointment)
admin.site.register(Employee)
