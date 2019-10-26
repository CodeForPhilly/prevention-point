from django.db import models
from core.models import Visit

class UrineDrugScreen(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    date_of_test = models.DateField()
    uds_temp = models.CharField(max_length=100, verbose_name="Urine Temperature")
    # TODO: does this belong here? if so, is it a Bool for if a PT was taken, or Bool for if pregnant?
    pregnancy_test = models.BooleanField(default=False)
    opiates = models.BooleanField(default=False)
    fentanyl = models.BooleanField(default=False)
    bup = models.BooleanField(default=False, verbose_name="Buprenorphine")
    coc = models.BooleanField(default=False, verbose_name="Cocaine")
    amp = models.BooleanField(default=False, verbose_name = "Amphetamine")
    m_amp = models.BooleanField(default=False, verbose_name = "Methamphetamine")
    thc = models.BooleanField(default=False, verbose_name = "THC")
    mtd = models.BooleanField(default=False, verbose_name = "Methadone")
    pcp = models.BooleanField(default=False, verbose_name = "PCP")
    bar = models.BooleanField(default=False, verbose_name = "Barbiturates")
    bzo = models.BooleanField(default=False, verbose_name = "Benzodiazepines")
    tca = models.BooleanField(default=False, verbose_name = "Tricyclic Antidepressants")
    oxy = models.BooleanField(default=False, verbose_name = "Oxycodone")

    def __str__(self):
        return 'UDS #%i for Visit #%i' % (self.id, self.visit_id)
