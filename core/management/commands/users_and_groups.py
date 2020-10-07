from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, User, Permission

DEFAULT_DEV_ENV_PASS = "password123"

INTERNAL_PROVIDER_PERMISSIONS = [
    "add_insurer",
    "change_insurer",
    "view_insurer",
    "add_participant",
    "change_participant",
    "view_participant",
    "add_program",
    "change_program",
    "view_program",
    "add_service",
    "change_service",
    "view_service",
    "add_visit",
    "change_visit",
    "view_visit",
    "add_hcvnotes",
    "change_hcvnotes",
    "view_hcvnotes",
    "add_medication",
    "change_medication",
    "view_medication",
    "add_appointment",
    "change_appointment",
    "view_appointment",
    "add_casemanagement",
    "change_casemanagement",
    "view_casemanagement",
    "add_frontdeskevent",
    "change_frontdeskevent",
    "view_frontdeskevent",
    "add_urinedrugscreen",
    "change_urinedrugscreen",
    "view_urinedrugscreen",
    "add_programavailability",
    "change_programavailability",
    "view_programavailability",
    "add_behavioralhealthnotes",
    "change_behavioralhealthnotes",
    "view_behavioralhealthnotes",
    "view_site",
    "add_sep_data",
    "change_sep_data",
    "view_sep_data",
]

FRONT_DESK_PERMISSIONS = [
    "add_insurer",
    "change_insurer",
    "view_insurer",
    "add_participant",
    "change_participant",
    "view_participant",
    "add_program",
    "change_program",
    "view_program",
    "add_service",
    "change_service",
    "view_service",
    "add_visit",
    "change_visit",
    "add_appointment",
    "change_appointment",
    "view_appointment",
    "add_frontdeskevent",
    "change_frontdeskevent",
    "view_frontdeskevent",
    "add_programavailability",
    "change_programavailability",
    "view_programavailability",
    "view_site",
    "add_sep_data",
]

UDS_PROVIDER_PERMISSIONS = [
    "view_insurer",
    "add_participant",
    "change_participant",
    "view_participant",
    "view_program",
    "view_service",
    "change_visit",
    "view_visit",
    "add_appointment",
    "change_appointment",
    "view_appointment",
    "add_frontdeskevent",
    "change_frontdeskevent",
    "view_frontdeskevent",
    "view_programavailability",
    "add_urinedrugscreen",
    "change_urinedrugscreen",
    "view_urinedrugscreen",
    "view_site",
]

DEFAULT_GROUPS = {
    "front_desk": FRONT_DESK_PERMISSIONS,
    "uds_provider": UDS_PROVIDER_PERMISSIONS,
    "internal_provider": INTERNAL_PROVIDER_PERMISSIONS,
}


class Command(BaseCommand):
    help = "Handle the users and groups portion of the seed."

    def handle(self, *args, **options):
        create_users(output=False)
        create_groups(output=False)
        add_users_to_groups(output=False)


def generate_email(group):
    return f"{group}@{group}.com"


def create_users(output=True):

    admin = User.objects.create_user(username="admin", email=generate_email("admin"))
    admin.set_password(DEFAULT_DEV_ENV_PASS)
    admin.is_staff = True
    admin.is_superuser = True
    admin.save()

    for group in DEFAULT_GROUPS:
        email = generate_email(group)
        u = User.objects.create_user(username=group, email=email)
        u.set_password(DEFAULT_DEV_ENV_PASS)
        u.save()

        if output:
            print("Created user: {}".format(email))


def create_groups(output=True):
    for group, group_permissions in DEFAULT_GROUPS.items():
        group_object = Group.objects.get_or_create(name=group)[0]
        for g_p in group_permissions:
            permission = Permission.objects.get(codename=g_p)
            group_object.permissions.add(permission)
        if output:
            print("Created group: {}".format(group))


def add_users_to_groups(output=True):
    """
    adds user to group of same name
    """

    for group in DEFAULT_GROUPS:
        user = User.objects.get(username=group)
        role_title = Group.objects.get(name=group)
        user.groups.add(role_title)
