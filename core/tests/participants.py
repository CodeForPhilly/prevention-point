import json

from django.contrib.auth.models import User, Permission
from django.urls import reverse
from rest_framework import status

from core.tests.base import BaseTestCase
from core.models import Participant, Race, Gender, Visit
from core.management.commands.users_and_groups import DEFAULT_DEV_ENV_PASS


class ParticipantsTestCase(BaseTestCase):
    fixtures = ["participants.yaml"]

    def test_participants_api_when_authed_as_front_desk(self):
        headers = self.auth_headers_for_user("front_desk")
        response = self.client.get("/api/participants", follow=True, **headers)

        self.assertEqual(200, response.status_code)

    def test_participants_api_when_unauthenticated(self):
        response = self.client.get("/api/participants", follow=True)
        self.assertEqual(401, response.status_code)

    def test_participants_can_be_queried_by_pp_id(self):
        headers = self.auth_headers_for_user("front_desk")
        response = self.client.get(
            "/api/participants?pp_id=pp_1234", follow=True, **headers
        )
        self.assertEqual(200, response.status_code)

        assert len(response.data) == 1
        assert response.data[0]["id"] == Participant.objects.get(pp_id="pp_1234").id

    def test_sep_returned_by_api_request(self):
        """
        ensure sep id is returned in participant request
        """
        headers = self.auth_headers_for_user("front_desk")
        known_participant_id = 4

        response = self.client.get(
            f"/api/participants/{known_participant_id}", follow=True, **headers
        )

        content = json.loads(response.content)

        self.assertEqual(200, response.status_code)
        self.assertTrue("sep_id" in content)

    def test_sep_filtered_response(self):
        """
        ensure known sep id returned when entered completely
        """
        headers = self.auth_headers_for_user("front_desk")
        known_sep_id = 'ab12347'

        response = self.client.get(
            f"/api/participants?sep_id={known_sep_id}", follow=True, **headers
        )
        content = json.loads(response.content)

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(content), 1)

    def test_sep_filtered_multi_response(self):
        """
        ensure sep ids containing the search query are returned
        """
        headers = self.auth_headers_for_user("front_desk")
        known_sep_id_contains = 'ab23'

        response = self.client.get(
            f"/api/participants?sep_id={known_sep_id_contains}", follow=True, **headers
        )
        content = json.loads(response.content)

        self.assertEqual(200, response.status_code)
        self.assertTrue(len(content) > 1)

    def test_sep_must_be_unique(self):
        """
        ensure unique sep id enforced
        """
        headers = self.auth_headers_for_user("front_desk")
        participant_1 = {
            "sep_id": "jr1234",
            "pp_id": "pp_1111",
            "first_name": "foo",
            "last_name": "bar",
            "last_four_ssn": 3333,
            "race": Race.ASIAN_PI.value,
            "gender": Gender.FEMALE.value,
            "date_of_birth": "1961-01-26",
            "start_date": "2019-04-21",
            "is_insured": False,
        }

        response_1 = self.client.post(
            "/api/participants/", participant_1, follow=True, **headers
        )
        self.assertEqual(201, response_1.status_code)

        participant_2 = {
            "sep_id": "jr1234",
            "pp_id": "pp_1112",
            "first_name": "oof",
            "last_name": "rab",
            "last_four_ssn": 3334,
            "race": Race.LATINO.value,
            "gender": Gender.OTHER.value,
            "date_of_birth": "1961-01-26",
            "start_date": "2019-04-21",
            "is_insured": False,
        }

        response_2 = self.client.post(
            "/api/participants/", participant_2, follow=True, **headers
        )

        self.assertEqual(400, response_2.status_code)

    def test_can_query_maiden_name(self):
        # Ensure participant is returned when maiden name is queried
        headers = self.auth_headers_for_user("front_desk")
        known_maiden_name = "dwayne"

        response = self.client.get(
            f"/api/participants?maiden_name={known_maiden_name}", follow=True, **headers
        )

        content = json.loads(response.content)

        self.assertEqual(200, response.status_code)
        self.assertTrue(len(content) == 1)

    def test_return_four_oh_four_query(self):
        headers = self.auth_headers_for_user("front_desk")
        invalid_id = 100000

        response = self.client.get(
            f"/api/participants?pp_id={invalid_id}", follow=True, **headers
        )

        self.assertEqual(404, response.status_code)


class ParticipantVisitsViewTestCase(BaseTestCase):
    fixtures = ["participants.yaml", "programs", "services.yaml", "visits.yaml"]

    def test_get_participant_vists(self):
        participant_id = 3
        headers = self.auth_headers_for_user("admin")
        response = self.client.get(
            reverse('participant-visits', args=[participant_id]), **headers
        )
        expected_visit_ids = Visit.objects.filter(
            participant_id=participant_id
        ).values_list('id', flat=True)

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data), len(expected_visit_ids))

        expected_visit_ids = set(expected_visit_ids)
        actual_visit_ids = set(actual_visit['id'] for actual_visit in response.data)
        self.assertEqual(expected_visit_ids, actual_visit_ids)

    def test_404_participant_vists(self):
        empty_participant_id = 100000
        headers = self.auth_headers_for_user("admin")
        response = self.client.get(
            reverse('participant-visits', args=[empty_participant_id]), **headers
        )
        self.assertEqual(404, response.status_code)

    def test_no_auth_participant_vists(self):
        """Test that users that aren't logged in get a 401 response."""
        participant_id = 3
        response = self.client.get(
            reverse('participant-visits', args=[participant_id])
        )
        expected_data = {"detail": "Authentication credentials were not provided."}
        self.assertEqual(401, response.status_code)
        self.assertEqual(expected_data, response.data)

    def test_no_permission_participant_vists(self):
        """Test that users without view permissions for both participant and visit get a 403."""
        participant_id = 3
        user = User.objects.create_user(
            username='participant-visits-user', password=DEFAULT_DEV_ENV_PASS
        )
        participant_permission = Permission.objects.get(codename='view_participant')
        visits_permission = Permission.objects.get(codename='view_visit')
        expected_data = {"detail": "You do not have permission to perform this action."}

        # Test that having no model perms fails.
        headers = self.auth_headers_for_user('participant-visits-user')
        response = self.client.get(
            reverse('participant-visits', args=[participant_id]), **headers
        )
        self.assertEqual(403, response.status_code)
        self.assertEqual(expected_data, response.data)

        # Test that having only participant permission fails.
        user.user_permissions.set([participant_permission])
        headers = self.auth_headers_for_user('participant-visits-user')
        response = self.client.get(
            reverse('participant-visits', args=[participant_id]), **headers
        )
        self.assertEqual(403, response.status_code)
        self.assertEqual(expected_data, response.data)

        # Test that having only visit participant_permission fails.
        user.user_permissions.set([visits_permission])
        headers = self.auth_headers_for_user('participant-visits-user')
        response = self.client.get(
            reverse('participant-visits', args=[participant_id]), **headers
        )
        self.assertEqual(403, response.status_code)
        self.assertEqual(expected_data, response.data)


    def test_model_permission_participant_vists(self):
        """Test that users with view permissions for both participant and visit get a 200."""
        participant_id = 3
        user = User.objects.create_user(
            username='participant-visits-user', password=DEFAULT_DEV_ENV_PASS
        )
        participant_permission = Permission.objects.get(codename='view_participant')
        visits_permission = Permission.objects.get(codename='view_visit')
        user.user_permissions.add(participant_permission, visits_permission)

        headers = self.auth_headers_for_user('participant-visits-user')
        response = self.client.get(
            reverse('participant-visits', args=[participant_id]), **headers
        )
        self.assertEqual(200, response.status_code)
