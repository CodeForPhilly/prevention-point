import React, { useContext, useEffect } from "react"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import PrevPointButton from "../components/PrevPointButton"
import { rootStoreContext } from "../stores/RootStore"
import WithSubmit from "../components/WithSubmit"
import ParticipantForm from "../components/ParticipantForm"
import VisitForm from "../components/VisitForm"

const useStyles = makeStyles(() => ({
  ButtonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}))

const ExistingParticipantView = observer(() => {
  const classes = useStyles()
  const rootStore = useContext(rootStoreContext)
  // particiant store derived from root store
  const participantStore = rootStore.ParticipantStore
  // set up history for routing pushes
  const history = useHistory()

  const existingParticipant = toJS(participantStore.participant)
  const existingVisit = toJS(participantStore.visit)
  const insurers = toJS(participantStore.insurers)
  const programList = toJS(participantStore.programs)
  const serviceList = toJS(participantStore.services)

  useEffect(() => {
    // kick off api calls for insurance list from Mobx
    participantStore.getInsurers()
    // kick off api calls for program list from Mobx
    participantStore.getPrograms()
    // -----------------------------------
    if (!Object.keys(participantStore.participant).length) {
      history.push("/participants")
    }

    // set these before assigning global state to component variables
    if (!Object.keys(participantStore.visit).length) {
      participantStore.setDefaultVisit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdateParticipant = e => {
    e.preventDefault()
    // TODO: validate
    participantStore.updateParticipant()
  }

  // set store stuff here and update Mobx on submit
  const handleSubmitVisit = () => {
    // if existing  visit we are coming from QueueTable, so update visit
    if (existingVisit.id) {
      participantStore.updateVisit()
    } else {
      participantStore.createVisit()
    }
    // after all api calls for submit have been completed route to QueueTable
    autorun(() => {
      if (participantStore.routeToQueueTable) {
        history.push("/")
      }
    })
  }

  // set service listings based on chosen program
  const handleSetVisitProgram = value => {
    const serviceListing = programList.find(program => program.id === value)
    participantStore.setServiceList(serviceListing.services)
    participantStore.setVisitProgram(value)
    participantStore.setVisitService("")
  }

  return (
    <Container maxWidth="md">
      {Object.keys(participantStore.participant).length ? (
        <Grid
          container
          component="form"
          onSubmit={e => handleUpdateParticipant(e)}
          spacing={2}
        >
          <ParticipantForm
            insurers={insurers}
            isDisabled={!participantStore.isEditing}
            participantInfo={existingParticipant}
            setRace={value => participantStore.setRace(value)}
            setPPId={value => participantStore.setPPId(value)}
            setGender={value => participantStore.setGender(value)}
            setInsurer={value => participantStore.setInsurer(value)}
            setLastName={value => participantStore.setLastName(value)}
            setIsInsured={value => participantStore.setIsInsured(value)}
            setFirstName={value => participantStore.setFirstName(value)}
            setDateOfBirth={value => participantStore.setDateOfBirth(value)}
          />

          <Grid className={classes.ButtonWrapper} item xs={12}>
            <PrevPointButton
              type="button"
              size="large"
              onClick={() =>
                participantStore.setIsEditing(!participantStore.isEditing)
              }
            >
              {participantStore.isEditing ? "cancel" : "edit"}
            </PrevPointButton>
            {participantStore.isEditing ? (
              <PrevPointButton type="submit" size="large">
                Update Participant
              </PrevPointButton>
            ) : null}
          </Grid>
        </Grid>
      ) : null}

      {Object.keys(participantStore.visit).length ? (
        <WithSubmit
          component={VisitForm}
          handleSubmit={handleSubmitVisit}
          submitText={existingVisit.id ? "Update Visit" : "Create Visit"}
          visitInfo={existingVisit}
          programList={programList}
          serviceList={serviceList}
          setVisitProgram={value => handleSetVisitProgram(value)}
          setVisitService={value => participantStore.setVisitService(value)}
          setVisitUrgency={value => participantStore.setVisitUrgency(value)}
          setVisitNotes={value => participantStore.setVisitNotes(value)}
        />
      ) : null}
    </Container>
  )
})

export default ExistingParticipantView
