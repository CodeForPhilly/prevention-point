from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, User, Permission

from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

DEFAULT_DEV_ENV_PASS = "password123"
DEFAULT_GROUPS = [FRONT_DESK, CASE_MANAGER, ADMIN]

class Command(BaseCommand):
    help = "Handle the users and groups portion of the seed."

    def handle(self, *args, **options):
        self.create_users(output=False)
        self.create_groups(output=False)
        self.add_users_to_groups(output=False)

    def create_users(self, output=True):
        for group in DEFAULT_GROUPS:
            email = "{}@{}.com".format(group, group)
            u = User.objects.create_user(username=group, email=email)
            u.set_password(DEFAULT_DEV_ENV_PASS)

            if group == ADMIN:
                u.is_superuser = True
                u.is_staff = True

            u.save()

            if output:
                print("Created user: {}".format(email))


    def create_groups(self, output=True):
        for group in DEFAULT_GROUPS:
            the_group = Group.objects.get_or_create(name=group)
            if output:
                print("Created group: {}".format(group))
        admin = Group.objects.get(name='admin')
        permissions = Permission.objects.all()
        admin.permissions.set(permissions)


    def add_users_to_groups(self, output=True):
        """
        adds user to group of same name
        """

        for group in DEFAULT_GROUPS:
            user = User.objects.get(username=group)
            role_title = Group.objects.get(name=group)
            user.groups.add(role_title)
