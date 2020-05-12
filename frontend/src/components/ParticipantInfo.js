// TODO:
/**
 * 1. Break fields into smaller individual components for re-use in other forms
 * 2. Break up state in MobX for field re-use
 * 3. `<VisitForm />` should be conditionally generated based upon current action. eg could be "VisitList"
 */

/* eslint-disable indent */
import React, { useContext } from "react"
import { autorun } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import VisitForm from "./VisitForm"
import ParticipantForm from "./ParticipantForm"
import PrevPointButton from "./PrevPointButton"
import { rootStoreContext } from "../stores/RootStore"

const ParticipantInfo = observer(() => {
  const rootStore = useContext(rootStoreContext)
  // particiant store derived from root store
  const participantStore = rootStore.ParticipantStore
  // set up history for routing pushes
  const history = useHistory()

  // set store stuff here and update Mobx on submit
  const handleSubmit = e => {
    e.preventDefault()
    // if existing participant and vist we are coming from QueueTable, so update particiapnt and visit
    if (participantStore.participant.id && participantStore.visit.id) {
      participantStore.updateParticipant()
      participantStore.updateVisit()
      // if existing participant and no vist we are coming from search, so update particiapnt only
    } else if (participantStore.participant.id && !participantStore.visit.id) {
      participantStore.updateParticipant()
      participantStore.createVisit()
      // otherwise we are adding a new participant because both participant and visit will be undefined
    } else {
      participantStore.createParticipant()
    }
    // after all api calls for submit have been completed route to QueueTable
    autorun(() => {
      if (participantStore.routeToQueueTable) {
        history.push("/")
      }
    })
  }

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={e => handleSubmit(e)}
      >
        <ParticipantForm />
        <VisitForm />
        <Grid item xs={12}>
          <PrevPointButton type="submit" size="large">
            Add to Queue
          </PrevPointButton>
        </Grid>
      </Grid>
    </Container>
  )
})

export default ParticipantInfo
