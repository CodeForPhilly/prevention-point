from django.forms.models import model_to_dict
from core.tests.base import BaseTestCase
from django.core.exceptions import ValidationError
from django.core.management import call_command
from core.models import Service, Program
from rest_framework import status
import random
import json


def get_random_service():
    # gets random service from DB
    random_pk = random.randint(1, 40)
    return model_to_dict(Service.objects.get(pk=random_pk))


class ServicesTests(BaseTestCase):
    fixtures = ["services.yaml", "programs.yaml"]

    def test_get_services_list(self):
        """
        Ensures that list of services is returned
        """
        headers = self.auth_headers_for_user("admin")
        response = self.client.get("/api/services/", follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Service.objects.count(), 43)

    def test_update_availability(self):
        """
        Ensures the 'available' boolean can update
        """
        headers = self.auth_headers_for_user("admin")
        random_service = get_random_service()

        service_availability = random_service["available"]
        random_service["available"] = not service_availability
        route = "/api/services/{}/".format(random_service["id"])

        response = self.client.put(
            route,
            json.dumps(random_service),
            content_type="application/json",
            follow=True,
            **headers
        )
        updated_availabilty = Service.objects.get(pk=random_service["id"]).available

        self.assertNotEqual(service_availability, updated_availabilty)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_disallow_service_name_change(self):
        """
        Ensures that name field is read only
        """
        headers = self.auth_headers_for_user("admin")
        random_service = get_random_service()
        service_name = random_service["name"]
        random_service["name"] = "Some nonexistent service"
        route = "/api/services/{}/".format(random_service["id"])

        self.client.put(
            route,
            json.dumps(random_service),
            content_type="application/json",
            follow=True,
            **headers
        )
        unchanged_name = Service.objects.get(pk=random_service["id"]).name
        # returns a 200 status, but field is unchanged
        self.assertEqual(service_name, unchanged_name)

    def test_service_has_slug_field(self):
        """
        Ensure Service has slug field
        """
        headers = self.auth_headers_for_user("admin")
        random_service = get_random_service()
        route = "/api/services/{}/".format(random_service["id"])
        res = self.client.get(route, follow=True, **headers)
        content = json.loads(res.content)
        self.assertTrue("slug" in content)
        self.assertTrue(content["slug"], random_service["slug"])

    def test_disallow_slug_change(self):
        """
        Ensure slug field read only
        """
        headers = self.auth_headers_for_user("admin")
        random_service = get_random_service()
        service_slug = random_service["slug"]
        random_service["name"] = "a fake slug"
        route = "/api/services/{}/".format(random_service["id"])

        self.client.put(
            route,
            json.dumps(random_service),
            content_type="application/json",
            follow=True,
            **headers
        )
        unchanged_slug = Service.objects.get(pk=random_service["id"]).name
        # returns a 200 status, but field is unchanged
        self.assertEqual(service_slug, unchanged_slug)

    def test_slug_uniqueness(self):
        """
        Ensure slug field is unique.
        Note: since serializer removes name and slug
        bc read_only=true for all request types at the moment,
        we're testing the model directly
        """

        slug = "banana"

        program = Program.objects.all().first()
        Service.objects.create(name="some name", slug=slug, program=program)
        count_before_error = Service.objects.count()
        with self.assertRaises(Exception) as context:
            Service.objects.create(name="another name", slug=slug, program=program)

        self.assertEqual(Service.objects.count(), count_before_error)

    def test_slug_normalization(self):
        """
        Ensure slug gets normalized when created
        """

        slug = "   $%^$#    543 Sligh Bannaga *&^%*&   "
        program = Program.objects.all().first()
        service = Service.objects.create(name="some name", slug=slug, program=program)
        self.assertRegex(service.slug, r"[a-z0-9\-]")
