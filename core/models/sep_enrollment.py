from django.db import models
from core.models import Participant, DrugMatrix
from django.utils import timezone
from enum import Enum

class Housing(Enum):
    PERMANENT = "permanent_housing"
    TEMPORARY = "temporarily_housed"
    SHELTER = "shelter"
    STREET = "street"
    AT_RISK = "at_risk_for_homelessness"

class Treatment(Enum):
    METHADONE = "methadone"
    SUBOXONE = "suboxone"
    VIVITROL = "vivitrol"
    IOP = "IOP"
    #Make into multi-select?
    RECOVERY_HOUSE = "Recovery House"

class HealthInsurance(Enum):
    MEDICARE = "Medicare"
    MEDICAID = "Medicaid"
    NO = "No"
    OTHER = "Other"

class SepEnrollment(models.Model):
    HOUSING_CHOICES = [(key.value, key.value.title()) for key in Housing]
    TREATMENT_CHOICES = [(key.value, key.value.title()) for key in Treatment]
    HEALTH_INSURANCE_CHOICES = [(key.value, key.value.title()) for key in HealthInsurance]
    
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    zip_code = models.CharField(max_length=5, verbose_name="Zip Code")
    housing = models.CharField(choices=HOUSING_CHOICES, max_length=5, verbose_name="Current Housing Situation")
    drug_matrix = models.ForeignKey(DrugMatrix, on_delete=models.CASCADE)
    in_treatment = models.BooleanField(default=False, verbose_name="In Treatment")
    treatment_type = models.CharField(default=None, null=True, choices=TREATMENT_CHOICES, max_length=5, verbose_name="Type of Drug Treatment")
    health_insurance = models.CharField(choices=HEALTH_INSURANCE_CHOICES, max_length=4, verbose_name="Do they have health insurance")
    health_insurance_other = models.CharField(default=None, null=True, max_length=100, verbose_name="Indicate Health Insurance")
    hep_c_test = models.BooleanField(default=False, verbose_name="Tested for hepatitis C")
    hep_c_test_date = models.DateField(null=True)
    hiv_test = models.BooleanField(default=False, verbose_name="Tested for HIV")
    hiv_test_date = models.DateField(null=True)
    narcan = models.BooleanField(default=False, verbose_name="Do you have Narcan today")
    #Staff only:
    harm_reduction_counseling = models.BooleanField(default=False, verbose_name="Received Harm Reduction Counseling")
    left_with_narcan = models.BooleanField(default=False, verbose_name="Participant left with Narcan")
    overdose_prevention = models.BooleanField(default=False, verbose_name="Received Overdose Prevention Counseling")
    mobile_site_schedule = models.BooleanField(default=False, verbose_name="Participant left with mobile site schedule")
    referred_to_testing = models.BooleanField(default=False, verbose_name="Referred to HIV or HCV testing")

    def clean(self):
        """
        Set treatment_type to null if not in treatment 
        """
        if (self.in_treatment is False):
            self.treatment_type = None

        """
        Set health_insurance_other to null if no, medicare, or medicaid 
        """
        if (self.health_insurance != 'other'):
            self.health_insurance_other = None

        """
        Set hep_c_test_date to null if hep_c_test is false 
        """
        if (self.hep_c_test is False):
            self.hep_c_test_date = None

        """
        Set hiv_test_date to null if hiv_test is false 
        """
        if (self.hiv_test is False):
            self.hiv_test_date = None

        self.is_cleaned = True

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)