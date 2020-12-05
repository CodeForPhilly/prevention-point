import React, { useContext, useEffect } from "react"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory, Link, useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { handleSnackbarError } from "../error"
import PrevPointButton from "../components/PrevPointButton"
import { RootStoreContext } from "../stores/RootStore"
import ParticipantForm from "../components/ParticipantForm"
import VisitRouter from "../components/VisitRouter"
import { validateForm, PARTICIPANT_SCHEMA } from "../validation/index"
import { SNACKBAR_SEVERITY } from "../constants"

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
  const rootStore = useContext(RootStoreContext)
  // particiant store derived from root store
  const participantStore = rootStore.ParticipantStore
  // Utility store derived from root store
  const utilityStore = rootStore.UtilityStore

  const { participantId } = useParams()
  const history = useHistory()

  const existingParticipant = toJS(participantStore.participant)
  const insurers = toJS(participantStore.insurers)

  useEffect(() => {
    // kick off api calls for relevant data
    participantStore.getInsurers()
    participantStore.getPrograms()
    async function matchParticpantIdToParams() {
      if (!participantStore.participant.id !== participantId) {
        // get participant data via param id if not in state or mismatch between state and route
        const ok = await participantStore.getParticipant(participantId)
        if (!ok) {
          participantStore.setDefaultParticipant()
          participantStore.setDefaultVisit()
          history.push("/404/")
        }
      }
    }

    matchParticpantIdToParams()
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
          utilityStore.setSnackbarState(
            `Theres an error in the ${error.name} field.`,
            {
              severity: SNACKBAR_SEVERITY.ERROR,
            }
          )
        )
      } else {
        participantStore.updateParticipant()
      }
    } catch (err) {
      const snackbarError = handleSnackbarError(err)
      utilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
  }

  const handleCancelEditParticipant = () => {
    if (participantStore.isEditing) {
      participantStore.setIsEditing(false)
      participantStore.getParticipant(participantId)
    } else {
      participantStore.setIsEditing(true)
    }
  }

  //  this logic should be replaced by a loading component
  if (!existingParticipant.id) {
    return null
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
            <PrevPointButton
              component={Link}
              to={`/participants/${existingParticipant.id}`}
            >
              Visit Form
            </PrevPointButton>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.ButtonCenter}>
            <PrevPointButton
              component={Link}
              to={`/participants/${existingParticipant.id}/visits`}
            >
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
