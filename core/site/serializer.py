from rest_framework import serializers
from core.models import Site


class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ('id', 'site_name', 'site_type', 'description', 'address', 'zip_code', 'created_at')

