import React, { useContext, useEffect } from "react"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import PrevPointButton from "../components/PrevPointButton"
import { rootStoreContext } from "../stores/RootStore"
import ParticipantForm from "../components/ParticipantForm"
import VisitRouter from "../components/VisitRouter"

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

    // return to /participants page if "current participant" is not set
    // add participants in NewParticipantView
    if (!Object.keys(participantStore.participant).length) {
      history.push("/participants")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdateParticipant = e => {
    e.preventDefault()
    // TODO: validate
    participantStore.updateParticipant()
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
            {/* Disable the fields until 'edit' is clicked. hide  submit button until isEditing is true */}
            <PrevPointButton
              type="button"
              onClick={() =>
                participantStore.setIsEditing(!participantStore.isEditing)
              }
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
