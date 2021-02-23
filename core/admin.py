from django.contrib import admin
from core.models import *

# Register your models here.
admin.site.register(ProgramAvailability)
admin.site.register(Program)
admin.site.register(Site)
admin.site.register(DrugMatrix)
admin.site.register(SepEnrollment)


class ServiceAdmin(admin.ModelAdmin):

    def get_readonly_fields(self, request, obj=None):
        # slug is set on create and unchangable afterwards
        if obj:
            return ('slug',)
        return []

admin.site.register(Service, ServiceAdmin)
