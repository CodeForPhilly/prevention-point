from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, User, Permission

DEFAULT_DEV_ENV_PASS = "password123"

ADMIN_PERMISSIONS = [
    "add_logentry",
    "change_logentry",
    "view_logentry",
    "add_permission",
    "change_permission",
    "delete_permission",
    "view_permission",
    "add_group",
    "change_group",
    "delete_group",
    "view_group",
    "add_user",
    "change_user",
    "delete_user",
    "view_user",
    "add_contenttype",
    "change_contenttype",
    "delete_contenttype",
    "view_contenttype",
    "add_session",
    "change_session",
    "delete_session",
    "view_session",
    "add_insurer",
    "change_insurer",
    "delete_insurer",
    "view_insurer",
    "add_participant",
    "change_participant",
    "delete_participant",
    "view_participant",
    "add_program",
    "change_program",
    "delete_program",
    "view_program",
    "add_service",
    "change_service",
    "delete_service",
    "view_service",
    "add_programservicemap",
    "change_programservicemap",
    "delete_programservicemap",
    "view_programservicemap",
    "add_visit",
    "change_visit",
    "delete_visit",
    "view_visit",
    "add_hcvnotes",
    "change_hcvnotes",
    "delete_hcvnotes",
    "view_hcvnotes",
    "add_medication",
    "change_medication",
    "delete_medication",
    "view_medication",
    "add_appointment",
    "change_appointment",
    "delete_appointment",
    "view_appointment",
    "add_casemanagement",
    "change_casemanagement",
    "delete_casemanagement",
    "view_casemanagement",
    "add_frontdeskevent",
    "change_frontdeskevent",
    "delete_frontdeskevent",
    "view_frontdeskevent",
    "add_urinedrugscreen",
    "change_urinedrugscreen",
    "delete_urinedrugscreen",
    "view_urinedrugscreen",
    "add_programavailability",
    "change_programavailability",
    "delete_programavailability",
    "view_programavailability",
    "add_behavioralhealthnotes",
    "change_behavioralhealthnotes",
    "delete_behavioralhealthnotes",
    "view_behavioralhealthnotes",
]

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
    "add_programservicemap",
    "view_programservicemap",
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
    "add_programservicemap",
    "view_programservicemap",
    "add_visit",
    "change_visit",
    "view_visit",
    "add_appointment",
    "change_appointment",
    "view_appointment",
    "add_frontdeskevent",
    "change_frontdeskevent",
    "view_frontdeskevent",
    "add_programavailability",
    "change_programavailability",
    "view_programavailability",
]

UDS_PROVIDER_PERMISSIONS = [
    "view_insurer",
    "add_participant",
    "change_participant",
    "view_participant",
    "view_program",
    "view_service",
    "view_programservicemap",
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
]

DEFAULT_GROUPS = {
    "admin": ADMIN_PERMISSIONS,
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


def create_users(output=True):
    for group in DEFAULT_GROUPS:
        email = "{}@{}.com".format(group, group)
        u = User.objects.create_user(username=group, email=email)
        u.set_password(DEFAULT_DEV_ENV_PASS)

        if group == "admin":
            u.is_staff = True
            u.is_superuser = True

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
