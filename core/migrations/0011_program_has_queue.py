# Generated by Django 2.2.13 on 2020-12-06 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20201204_2107'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='has_queue',
            field=models.BooleanField(default=False),
        ),
    ]
