import json
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
from core.models import (
    Visit,
    UrgencyLevel,
    Medication,
    UrineDrugScreen,
    BehavioralHealthNote,
    CaseManagement,
    HCVNote,
)
from core.tests.base import BaseTestCase


class VisitTests(BaseTestCase):
    fixtures = [
        "participants.yaml",
        "programs.yaml",
        "services.yaml",
    ]


    def test_create_visit(self):
        """
        Ensure we can create a new visit
        """
        headers = self.auth_headers_for_user("front_desk")
        url = reverse("visit-list")
        data = {
            "participant": 1,
            "program": 1,
            "service": 1,
            "notes": "hello prevention point",
            "urgency": UrgencyLevel.TIME_SENSITIVE.value,
        }
        response = self.client.post(url, data, format="json", follow=True, **headers)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(json.loads(response.content)["participant"], 1)
        self.assertEqual(json.loads(response.content)["program"], 1)

    def test_update_visit_notes(self):
        """
        Ensure we can update notes on a visit
        """
        # create a visit
        headers = self.auth_headers_for_user("front_desk")
        data = {"participant": 1, "program": 1, "service": 1, "urgency": UrgencyLevel.URGENT.value}
        create_response = self.client.post(
            "/api/visits/", data, format="json", **headers
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        headers = self.auth_headers_for_user("internal_provider")
        new_note = "I forgot to add notes the first time!"

        visit_id = json.loads(create_response.content)["id"]

        data = {"id": visit_id, "notes": new_note}
        update_response = self.client.patch(
            f"/api/visits/{visit_id}/", data, format="json", **headers
        )

        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(Visit.objects.get(id=visit_id).notes, new_note)


    def test_update_visit_urgency(self):
        """
        Ensure we can update urgency on a visit
        """
        # create a visit
        headers = self.auth_headers_for_user("front_desk")
        data = {"participant": 1, "program": 1, "service": 1, "urgency": UrgencyLevel.BRIEF_VISIT.value}
        create_response = self.client.post(
            "/api/visits/", data, format="json", **headers
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        headers = self.auth_headers_for_user("internal_provider")
        new_urgency = UrgencyLevel.CRISIS

        visit_id = json.loads(create_response.content)["id"]

        data = {"id": visit_id, "urgency": new_urgency.value}
        update_response = self.client.patch(
            f"/api/visits/{visit_id}/", data, format="json", **headers
        )

        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(Visit.objects.get(id=visit_id).urgency, new_urgency.name)


    def test_invalid_urgency_value_rejected(self):
        """
        Ensure invalid urgency values are rejected
        """
        # create a visit
        headers = self.auth_headers_for_user("front_desk")
        invalid_urgency = 100
        data = {"participant": 1, "program": 1, "service": 1, "urgency": invalid_urgency}

        create_response = self.client.post(
            "/api/visits/", data, format="json", **headers
        )
        self.assertEqual(create_response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_string_urgency_value_rejected(self):
        """
        Ensure invalid urgency values are rejected
        """
        # create a visit
        headers = self.auth_headers_for_user("front_desk")

        data = {"participant": 1, "program": 1, "service": 1, "urgency": 'TIME_SENSITIVE'}
        create_response = self.client.post(
            "/api/visits/", data, format="json", **headers
        )
        self.assertEqual(create_response.status_code, status.HTTP_400_BAD_REQUEST)

        data_b = {"participant": 1, "program": 1, "service": 1, "urgency": '1'}
        create_response_b = self.client.post(
            "/api/visits/", data_b, format="json", **headers
        )
        self.assertEqual(create_response_b.status_code, status.HTTP_400_BAD_REQUEST)


    def test_update_visit_program_service(self):
        """
        Ensure we can update program and service on a visit
        """
        # create a visit
        headers = self.auth_headers_for_user("front_desk")
        data = {"participant": 1, "program": 1, "service": 1, "urgency": UrgencyLevel.BRIEF_VISIT.value}
        create_response = self.client.post(
            "/api/visits/", data, format="json", **headers
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        headers = self.auth_headers_for_user("internal_provider")
        visit_id = json.loads(create_response.content)["id"]

        data = {"id": visit_id, "program": 2, "service": 6}
        update_response = self.client.patch(
            f"/api/visits/{visit_id}/", data, format="json", **headers
        )

        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(Visit.objects.count(), 1)
        self.assertEqual(Visit.objects.get(id=visit_id).program.id, 2)
        self.assertEqual(Visit.objects.get(id=visit_id).service.id, 6)


    def test_failure_visit_post_invalid_program_service_combination (self):
        """
        Ensure we cannot update program/service on a visit when they are unrelated
        """

        headers = self.auth_headers_for_user("front_desk")
        data = {"participant": 1, "program": 3, "service": 10, "urgency": UrgencyLevel.TIME_SENSITIVE.value}
        create_response = self.client.post(
            "/api/visits/", data, format="json", **headers
        )


        self.assertEqual(create_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_visits(self):
        """
        Ensure we can get a list of visits
        """
        url = reverse("visit-list")
        headers = self.auth_headers_for_user("internal_provider")

        # create 3 visits for each participant
        for participant in range(1, 4):
            data = {
                "participant": participant,
                "program": 1,
                "service": 2,
                "notes": "hello prevention point",
                "urgency": UrgencyLevel.URGENT.value,
            }
            post_response = self.client.post(url, data, format="json", **headers)
            self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visit.objects.count(), 3)

        # get the visits we just created
        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)

    def test_get_visit_authorization(self):
        """
        Ensure front desk cannot retrieve visits
        """
        headers = self.auth_headers_for_user("front_desk")
        url = reverse("visit-list")

        get_response = self.client.get(url, **headers)
        self.assertEqual(get_response.status_code, status.HTTP_403_FORBIDDEN)


class VisitMedicalRelationsTests(BaseTestCase):
    fixtures = [
        "participants.yaml",
        "programs.yaml",
        "services.yaml",
    ]


    def test_create_visit_and_medical_data(self):
        """
        ensure medical models are linked correctly to visits. Model test only
        """
        new_visit = {
            "participant_id": 1,
            "program_id": 1,
            "service_id": 1,
            "notes": "hello prevention point",
            "urgency": UrgencyLevel.BRIEF_VISIT.name,
        }

        visit = Visit.objects.create(**new_visit)

        uds_data = {
            "visit_id": visit.pk,
            "date_of_test": timezone.now(),
            "uds_temp": "This is character field",
            "pregnancy_test": False,
            "opiates": False,
            "fentanyl": True,
            "bup": True,
            "coc": True,
            "amp": False,
            "m_amp": True,
            "thc": True,
            "mtd": True,
            "pcp": False,
            "bar": False,
            "bzo": False,
            "tca": False,
            "oxy": False,
        }

        uds_id = UrineDrugScreen.objects.create(**uds_data).pk

        meds_id = Medication.objects.create(
            medical_delivery="mouth",
            medication_name="advil",
            ingestion_frequency=100,
            visit_id=visit.pk,
        ).pk

        case_mgmt_id = CaseManagement.objects.create(
            crs_seen=True, visit_id=visit.pk
        ).pk

        bhn_id = BehavioralHealthNote.objects.create(
            visit_id=visit.pk,
            note_timestamp=timezone.now(),
            behavior_note="very healthy, much improvement seen",
        ).pk

        hcv_id = HCVNote.objects.create(
            visit_id=visit.pk,
            note_timestamp=timezone.now(),
            hcv_note="important hcv note",
        ).pk

        uds = UrineDrugScreen.objects.get(pk=uds_id)
        meds = Medication.objects.get(pk=meds_id)
        case_mgmt = CaseManagement.objects.get(pk=case_mgmt_id)
        health_notes = BehavioralHealthNote.objects.get(pk=bhn_id)
        hcv_notes = HCVNote.objects.get(pk=hcv_id)

        self.assertEqual(uds.visit_id, visit.pk)
        self.assertEqual(meds.visit_id, visit.pk)
        self.assertEqual(case_mgmt.visit_id, visit.pk)
        self.assertEqual(health_notes.visit_id, visit.pk)
        self.assertEqual(hcv_notes.visit_id, visit.pk)
