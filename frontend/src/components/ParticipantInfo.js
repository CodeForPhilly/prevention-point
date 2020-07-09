import React, { useContext, useEffect } from "react"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import PrevPointButton from "./PrevPointButton"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointHeading from "./Typography/PrevPointHeading"
import ParticipantForm from "./ParticipantForm"
import { URGENCY_OPTIONS } from "../constants"

const ParticipantInfo = observer(() => {
  const rootStore = useContext(rootStoreContext)
  // particiant store derived from root store
  const participantStore = rootStore.ParticipantStore
  // set up history for routing pushes
  const history = useHistory()

  // default values need to be set for the Select components to work
  // set these before assigning global state to component variables
  if (!Object.keys(participantStore.participant).length) {
    participantStore.setDefaultParticipant()
  }
  if (!Object.keys(participantStore.visit).length) {
    participantStore.setDefaultVisit()
  }

  const existingParticipant = toJS(participantStore.participant)
  const existingVisit = toJS(participantStore.visit)
  const insurers = toJS(participantStore.insurers)
  const programList = toJS(participantStore.programs)
  const serviceList = toJS(participantStore.services)
  // -----------------------------------

  useEffect(() => {
    // kick off api calls for insurance list from Mobx
    participantStore.getInsurers()
    // kick off api calls for program list from Mobx
    participantStore.getPrograms()
    // -----------------------------------
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // set store stuff here and update Mobx on submit
  const handleSubmit = e => {
    e.preventDefault()
    // if existing participant and vist we are coming from QueueTable, so update particiapnt and visit
    if (existingParticipant.id && existingVisit.id) {
      participantStore.updateParticipant()
      participantStore.updateVisit()
      // if existing participant and no vist we are coming from search, so update particiapnt only
    } else if (existingParticipant.id && !existingVisit.id) {
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
  // set service listings based on chosen program
  const findAndSaveServiceListings = e => {
    const serviceListing = programList.find(
      program => program.id === e.target.value
    )
    participantStore.setServiceList(serviceListing.services)
  }

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={e => handleSubmit(e)}
      >
        <ParticipantForm
          insurers={insurers}
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
        <Grid item xs={12}>
          <PrevPointHeading>
            <br />
            <br />
            2. Check In Participant
          </PrevPointHeading>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="program-select">Choose Program</InputLabel>
            <Select
              required
              value={existingVisit.program}
              onChange={e => {
                participantStore.setVisitProgram(e.target.value)
                participantStore.setVisitService("")
                findAndSaveServiceListings(e)
              }}
              labelId="program-select"
            >
              {programList.map(program => (
                <MenuItem
                  key={program.id}
                  value={
                    programList && programList.length > 0 ? program.id : ""
                  }
                >
                  {programList && programList.length > 0 ? program.name : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="service-select">Select Service</InputLabel>
            {existingVisit.program && serviceList.length > 0 ? (
              <Select
                required
                value={existingVisit.service}
                onChange={e => participantStore.setVisitService(e.target.value)}
                labelId="service-select"
              >
                {serviceList.map(service => (
                  <MenuItem
                    key={service.id}
                    value={
                      serviceList && serviceList.length > 0 ? service.id : ""
                    }
                  >
                    {serviceList && serviceList.length > 0 ? service.name : ""}
                  </MenuItem>
                ))}
              </Select>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="priority-level">Select Priority Level</InputLabel>
            <Select
              name="priority-level"
              value={existingVisit.urgency}
              onChange={e => participantStore.setVisitUrgency(e.target.value)}
              labelId="priority-level"
            >
              {URGENCY_OPTIONS.map(urgency => (
                <MenuItem key={urgency.value} value={urgency.value}>
                  {urgency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add a Note"
            name="visit-notes"
            value={existingVisit.notes}
            onChange={e => participantStore.setVisitNotes(e.target.value)}
          />
        </Grid>
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
