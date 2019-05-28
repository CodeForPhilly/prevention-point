from django.db import models
from enum import Enum
from core.visits.models import Visit
from core.models import Participant
from core.services.models import Service
from model_utils.managers import InheritanceManager

class ServiceEventPurpose(Enum):
    ARRIVED = 'arrived'
    CALLED = 'called'
    SEEN = 'seen'
    LEFT = 'left'

class ServiceEvent(models.Model):
    objects = InheritanceManager()
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    purpose = models.CharField(
        max_length=10,
        choices=[(tag.name, tag.value) for tag in ServiceEventPurpose]
    )

class UrineDrugScreen(ServiceEvent):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
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
        return 'UDS #%i for Participant #%i' % (self.id, self.participant_id)

