from django.test import TestCase, Client
from step.participants.models import Participant
from step.management.commands.seed import create_groups, create_users
from step.management.commands.seed import DEFAULT_DEV_ENV_PASS
from django.contrib.auth.models import Group, User

class BaseTestCase(TestCase):
    def setUp(self):
        self.auth_tokens_for_users = {}
        self.client = Client()

    def seed_fake_users(self):
        create_groups(output=False)
        create_users(output=False)

    def auth_headers_for_user(self, uname):
        token = self.auth_token_for_user(uname)
        bearer_token = "Bearer {}".format(token)
        return { 'HTTP_AUTHORIZATION': bearer_token }

    def auth_token_for_user(self, uname):
        """
        Memoize and return a jwt access token for a given user
        """
        try:
            return self.auth_tokens_for_users[uname]
        except KeyError:
            res = self.client.post('/api/token/', { 'username': uname, 'password': DEFAULT_DEV_ENV_PASS })
            token = res.data['access']
            self.auth_tokens_for_users[uname] = token
            return token

class ParticipantsTestCase(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.seed_fake_users()
        self.participant = Participant.objects.create(
                first_name="Foo", last_name="Bar", pp_id="1234",
                gender="m", race="other", last_four_ssn="1234", date_of_birth="1949-08-23",
                start_date="2019-01-01"
                )

    def test_participants_api_when_authed_as_front_desk(self):
        headers = self.auth_headers_for_user('frontdesk')
        response = self.client.get('/api/participants', follow=True, **headers)
        self.assertEqual(200, response.status_code)

    def test_participants_api_when_unauthenticated(self):
        response = self.client.get('/api/participants', follow=True)
        self.assertEqual(401, response.status_code)

    def test_participants_have_no_uds_by_default(self):
        self.assertEqual(0, self.participant.urinedrugscreen_set.count())
