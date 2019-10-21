from django.contrib.auth.models import Group, User
from core.tests.base import BaseTestCase
from core.models.insurer import Insurer


class InsurerssTestCase(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.seed_fake_users()

        self.insurer = Insurer.objects.create(
            name="InsureCo",
            is_active=True,
        )

    def test_create_insurer(self):
        """
        Ensure we can create a new insurer
        """
        headers = self.auth_headers_for_user('front_desk')
        url = reverse('insurer-list')
        data = {'name': "InsureCo, 'is_active': true}
        response = self.client.post(url, data, format='json',follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Insurer.objects.count(), 1)

    def test_insurerss_api_when_authed_as_front_desk(self):
        headers = self.auth_headers_for_user('front_desk')
        response = self.client.get('/api/insurerss', follow=True, **headers)

        self.assertEqual(200, response.status_code)

    def test_insurers_api_when_unauthenticated(self):
        response = self.client.get('/api/insurers', follow=True)
        self.assertEqual(401, response.status_code)

