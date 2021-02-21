from django.db import models
from core.models import Participant, DrugsUsed

class Housing(models.TextChoices):
    PERMANENT = "permanent_housing"
    TEMPORARY = "temporarily_housed"
    SHELTER = "shelter"
    STREET = "street"
    AT_RISK = "at_risk_for_homelessness"

class Treatment(models.TextChoices):
    METHADONE = "methadone"
    SUBOXONE = "suboxone"
    VIVITROL = "vivitrol"
    IOP = "IOP"
    #Make into multi-select?
    RECOVERY_HOUSE = "Recovery House"

class HealthInsurance(models.TextChoices):
    MEDICARE = "Medicare"
    MEDICAID = "Medicaid"
    NO = "No"
    OTHER = "Other"


class SepEnrollment(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    zip_code = models.CharField(max_length=5, null=True, verbose_name="Zip Code")
    housing = models.CharField(choices=Housing.choices, verbose_name="Current Housing Situation")
    drugs_used = models.ForeignKey(DrugsUsed, on_delete=models.CASCADE)
    in_treatment = models.BooleanField(default=False, verbose_name="In Treatment")
    treatment_type = models.CharField(choices=Treatment.choices, verbose_name="Type of Drug Treatment")
    health_insurance = models.CharField(choices=HealthInsurance.choices, verbose_name="Do they have health insurance")
    health_insurance_other = models.CharField(null=True, blank=True, verbose_name="Indicate Health Insurance")
    hep_c_test = models.BooleanField(default=False, verbose_name="Tested for hepatitis C")
    hep_c_test_date = models.DateField()
    hiv_test = models.BooleanField(default=False, verbose_name="Tested for HIV")
    hiv_test_date = models.DateField()
    narcan = models.BooleanField(default=False, verbose_name="Do you have Narcan today")
    #Staff only:
    harm_reduction_counseling = models.BooleanField(default=False, verbose_name="Received Harm Reduction Counseling")
    left_with_narcan = models.BooleanField(default=False, verbose_name="Participant left with Narcan")
    overdose_prevention = models.BooleanField(default=False, verbose_name="Received Overdose Prevention Counseling")
    mobile_site_schedule = models.BooleanField(default=False, verbose_name="Participant left with mobile site schedule")
    referred_to_testing = models.BooleanField(default=False, verbose_name="Referred to HIV or HCV testing")

