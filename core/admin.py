from django.contrib import admin
from core.models import Participant, Medication, CaseManagement, Appointment, Employee, BehavioralHealthNotes
from core.service_events.models import ServiceEvent, UrineDrugScreen

# Register your models here.
admin.site.register(Medication)
admin.site.register(UrineDrugScreen)
admin.site.register(CaseManagement)
admin.site.register(Appointment)
admin.site.register(Employee)
admin.site.register(BehavioralHealthNotes)
admin.site.register(ServiceEvent)

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
