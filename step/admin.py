from django.contrib import admin
from .models import Participant, Medication, UrineDrugScreen, CaseManagement, Appointment, Employee, BehavioralHealthNotes

# Register your models here.
admin.site.register(Medication)
admin.site.register(UrineDrugScreen)
admin.site.register(CaseManagement)
admin.site.register(Appointment)
admin.site.register(Employee)
admin.site.register(BehavioralHealthNotes)

class BaseInline(admin.StackedInline):
    extra = 0

class UrineDrugScreenInline(BaseInline):
    model = UrineDrugScreen

class AppointmentInline(BaseInline):
    model = Appointment

class MedicationInline(BaseInline):
    model = Medication

class CaseManagement(BaseInline):
    model = CaseManagement

class ParticipantAdmin(admin.ModelAdmin):
    inlines = [
            AppointmentInline,
            MedicationInline,
            CaseManagement,
            UrineDrugScreenInline,
            ]

admin.site.register(Participant, ParticipantAdmin)
