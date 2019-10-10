from django.contrib import admin
from core.models import *

# Register your models here.
admin.site.register(Medication)
admin.site.register(UrineDrugScreen)
admin.site.register(CaseManagement)
admin.site.register(Appointment)
admin.site.register(BehavioralHealthNotes)
admin.site.register(Visit)

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
