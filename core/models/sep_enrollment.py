from django.db import models
from core.models import Participant, DrugMatrix
from django.utils import timezone
from enum import Enum


class Housing(Enum):
    PERMANENT = "Permanent Housing"
    TEMPORARY = "Temporarily Housed"
    SHELTER = "Shelter"
    STREET = "Street"
    AT_RISK = "At Risk For Homelessness"


class Treatment(Enum):
    METHADONE = "Methadone"
    SUBOXONE = "Suboxone"
    VIVITROL = "Vivitrol"
    IOP = "IOP"
    RECOVERY_HOUSE = "Recovery House"
    NO_TREATMENT = "Not in Treatment"


class HealthInsurance(Enum):
    MEDICARE = "Medicare"
    MEDICAID = "Medicaid"
    OTHER = "Other"
    UNINSURED = "Uninsured"


class SepEnrollment(models.Model):
    HOUSING_CHOICES = [(key.value, key.value.title()) for key in Housing]
    TREATMENT_CHOICES = [(key.value, key.value.title()) for key in Treatment]
    HEALTH_INSURANCE_CHOICES = [
        (key.value, key.value.title()) for key in HealthInsurance
    ]

    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    zip_code = models.CharField(max_length=100, verbose_name="Zip Code")
    housing = models.CharField(
        choices=HOUSING_CHOICES,
        max_length=100,
        verbose_name="Current Housing Situation",
    )
    drug_matrix = models.ForeignKey(DrugMatrix, on_delete=models.CASCADE)
    treatment_type = models.CharField(
        default=None,
        null=True,
        choices=TREATMENT_CHOICES,
        max_length=100,
        verbose_name="Type of Drug Treatment",
    )
    health_insurance = models.CharField(
        choices=HEALTH_INSURANCE_CHOICES,
        max_length=100,
        verbose_name="Does participant have health insurance?",
    )
    health_insurance_other = models.CharField(
        default=None,
        null=True,
        max_length=100,
        verbose_name="Indicate Health Insurance",
    )
    hep_c_test = models.BooleanField(
        default=False, verbose_name="Tested for hepatitis C"
    )
    hep_c_test_date = models.DateField(blank=True, null=True)
    hiv_test = models.BooleanField(default=False, verbose_name="Tested for HIV")
    hiv_test_date = models.DateField(blank=True, null=True)
    narcan = models.BooleanField(
        default=False, verbose_name="Does participant have Narcan today?"
    )
    # Staff only:
    harm_reduction_counseling = models.BooleanField(
        default=False, verbose_name="Received Harm Reduction Counseling"
    )
    left_with_narcan = models.BooleanField(
        default=False, verbose_name="Participant left with Narcan"
    )
    overdose_prevention = models.BooleanField(
        default=False, verbose_name="Received Overdose Prevention Counseling"
    )
    mobile_site_schedule = models.BooleanField(
        default=False, verbose_name="Participant left with mobile site schedule"
    )
    referred_to_testing = models.BooleanField(
        default=False, verbose_name="Referred to HIV or HCV testing"
    )

    def clean(self):
        """
        Set health_insurance_other to null if uninsured, medicare, or medicaid
        """
        if self.health_insurance != "other":
            self.health_insurance_other = None

        """
        Set hep_c_test_date to null if hep_c_test is false 
        """
        if self.hep_c_test is False:
            self.hep_c_test_date = None

        """
        Set hiv_test_date to null if hiv_test is false 
        """
        if self.hiv_test is False:
            self.hiv_test_date = None

        self.is_cleaned = True

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

