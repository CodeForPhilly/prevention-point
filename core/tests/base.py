from django.test import TestCase, Client
from core.management.commands.seed import (
        create_groups,
        create_users,
        add_users_to_groups,
        DEFAULT_DEV_ENV_PASS
        )

class BaseTestCase(TestCase):
    def setUp(self):
        self.auth_tokens_for_users = {}
        self.client = Client()

    def seed_fake_users(self):
        create_groups(output=False)
        create_users(output=False)
        add_users_to_groups(output=False)

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

