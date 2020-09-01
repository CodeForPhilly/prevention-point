import json
from core.tests.base import BaseTestCase
from core.models import Participant, Race, Gender

class ParticipantsTestCase(BaseTestCase):
    fixtures = ["participants.yaml"]

    def test_participants_api_when_authed_as_front_desk(self):
        headers = self.auth_headers_for_user('front_desk')
        response = self.client.get('/api/participants', follow=True, **headers)

        self.assertEqual(200, response.status_code)

    def test_participants_api_when_unauthenticated(self):
        response = self.client.get('/api/participants', follow=True)
        self.assertEqual(401, response.status_code)

    def test_participants_can_be_queried_by_pp_id(self):
        headers = self.auth_headers_for_user('front_desk')
        response = self.client.get('/api/participants?pp_id=pp_1234', follow=True, **headers)
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
        known_sep_id = 12347

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
        known_sep_id_contains = 23

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
            "sep_id" : 11111,
            "pp_id" : "pp_1111",
            "first_name" : "foo",
            "last_name" : "bar",
            "last_four_ssn" : 3333,
            "race" : Race.ASIAN_PI.value,
            "gender" : Gender.FEMALE.value,
            "date_of_birth" : "1961-01-26",
            "start_date" : "2019-04-21",
            "is_insured" : False,
        }

        response_1 = self.client.post(
            "/api/participants/", participant_1, follow=True, **headers
        )
        self.assertEqual(201, response_1.status_code)

        participant_2 = {
            "sep_id" : 11111,
            "pp_id" : "pp_1112",
            "first_name" : "oof",
            "last_name" : "rab",
            "last_four_ssn" : 3334,
            "race" : Race.LATINO.value,
            "gender" : Gender.OTHER.value,
            "date_of_birth" : "1961-01-26",
            "start_date" : "2019-04-21",
            "is_insured" : False,
        }

        response_2 = self.client.post(
            "/api/participants/", participant_2, follow=True, **headers
        )

        self.assertEqual(400, response_2.status_code)
