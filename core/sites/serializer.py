from rest_framework import serializers
from core.models import Site


class SitesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ('id', 'site_name', 'site_address', 'site_zip', 'created_date')

