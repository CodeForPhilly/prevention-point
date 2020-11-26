import React, { useContext, useEffect } from "react"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import handleError from "../error"
import PrevPointButton from "../components/PrevPointButton"
import { rootStoreContext } from "../stores/RootStore"
import ParticipantForm from "../components/ParticipantForm"
import VisitRouter from "../components/VisitRouter"
import { validateForm, PARTICIPANT_SCHEMA } from "../validation/index"

const useStyles = makeStyles(() => ({
  ButtonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  ButtonCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },

  TempNav: {
    marginTop: "40px",
    marginBottom: "40px",
    border: "1px solid black",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
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
  const insurers = toJS(participantStore.insurers)

  useEffect(() => {
    // kick off api calls for insurance list from Mobx
    participantStore.getInsurers()
    // kick off api calls for program list from Mobx
    participantStore.getPrograms()
    // -----------------------------------

    // return to /participants page if current participant is not verified with an id
    // add participants in NewParticipantView
    if (!participantStore.participant.id) {
      // todo: reset to empty  object?
      history.push("/participants")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdateParticipant = async e => {
    e.preventDefault()
    let dob = new Date(existingParticipant.date_of_birth)
    existingParticipant.date_of_birth = dob
    try {
      let validationErrors = await validateForm(
        existingParticipant,
        PARTICIPANT_SCHEMA
      )
      if (validationErrors.length) {
        return validationErrors.map(error =>
          participantStore.setSnackbarState(
            `Theres an error in the ${error.name} field.`
          )
        )
      } else {
        participantStore.updateParticipant()
      }
    } catch (err) {
      participantStore.setSnackbarState(handleError(err))
    }
  }

  const handleCancelEditParticipant = () => {
    if (participantStore.isEditing) {
      participantStore.setIsEditing(false)
      participantStore.getParticipant()
    } else {
      participantStore.setIsEditing(true)
    }
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid
          container
          aria-label="Participant Form"
          component="form"
          onSubmit={e => handleUpdateParticipant(e)}
          spacing={2}
        >
          <ParticipantForm
            insurers={insurers}
            isDisabled={!participantStore.isEditing}
            participantInfo={existingParticipant}
            handleParticipantChange={eventTarget =>
              participantStore.handleParticipantChange(eventTarget)
            }
          />

          <Grid className={classes.ButtonWrapper} item xs={12}>
            {/* Disable the fields until 'edit' is clicked. hide  submit button until isEditing is true */}
            <PrevPointButton
              type="button"
              onClick={() => handleCancelEditParticipant()}
            >
              {participantStore.isEditing ? "cancel" : "Edit Participant Info"}
            </PrevPointButton>
            {participantStore.isEditing ? (
              <PrevPointButton type="submit" size="large">
                Update Participant
              </PrevPointButton>
            ) : null}
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.TempNav}>
          <Grid item xs={12} sm={6} className={classes.ButtonCenter}>
            <PrevPointButton component={Link} to="/existingParticipant">
              Visit Form
            </PrevPointButton>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.ButtonCenter}>
            <PrevPointButton component={Link} to="/existingParticipant/visits">
              All Visits Table
            </PrevPointButton>
          </Grid>
        </Grid>
      </Container>
      <VisitRouter />
    </>
  )
})

export default ExistingParticipantView
