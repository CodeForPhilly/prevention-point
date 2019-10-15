from django.contrib.auth.models import Group, User
from core.tests.base import BaseTestCase
from core.models import Participant


class ParticipantsTestCase(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.seed_fake_users()
        self.participant = Participant.objects.create(
            first_name="Foo",
            last_name="Bar",
            pp_id="pp_1234",
            gender="m",
            race="other",
            last_four_ssn="1234",
            date_of_birth="1949-08-23",
            start_date="2019-01-01"
        )

    def test_participants_api_when_authed_as_front_desk(self):
        headers = self.auth_headers_for_user('front_desk')
        response = self.client.get('/api/participants', follow=True, **headers)

        self.assertEqual(200, response.status_code)

    def test_participants_api_when_unauthenticated(self):
        response = self.client.get('/api/participants', follow=True)
        self.assertEqual(401, response.status_code)

    def test_participants_have_no_uds_by_default(self):
        self.assertEqual(0, self.participant.urinedrugscreen_set.count())

    def test_participants_can_be_queried_by_pp_id(self):
        headers = self.auth_headers_for_user('front_desk')
        response = self.client.get('/api/participants?pp_id=pp_1234', follow=True, **headers)
        self.assertEqual(200, response.status_code)

        assert len(response.data) == 1
        assert response.data[0]['id'] == self.participant.id
