// TODO:
/**
 * 1. Breakup into participant and visit child components
 * 2. Break fields into smaller individual components for re-use in other forms
 * 3. Break up state in MobX for field re-use
 */

/* eslint-disable indent */
import React, { useContext, useEffect } from "react"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Radio from "@material-ui/core/Radio"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import FormLabel from "@material-ui/core/FormLabel"
import InputLabel from "@material-ui/core/InputLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import PrevPointInput from "./PrevPointInput"
import PrevPointButton from "./PrevPointButton"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointHeading from "./Typography/PrevPointHeading"

const ParticipantInfo = observer(() => {
  const rootStore = useContext(rootStoreContext)
  // particiant store derived from root store
  const participantStore = rootStore.ParticipantStore
  // TODO: refactor after v1.0.0 release
  const queueStore = rootStore.QueueStore
  // set up history for routing pushes
  const history = useHistory()
  // get existing participant if applicable else its undefined
  const existingParticipant = toJS(participantStore.participant)
  // get existing visit if applicable else its undefined
  const existingVisit = toJS(participantStore.visit)
  const insurers = toJS(participantStore.insurers)
  let programList = toJS(participantStore.programs)
  const serviceList = toJS(participantStore.services)

  // TODO: refactor after v1.0.0 release
  if (existingParticipant.id && !existingVisit.id) {
    let filterThesePrograms = []
    queueStore.participantWithPrograms.forEach(currentparticipantprograms => {
      if (existingParticipant.id === currentparticipantprograms.id) {
        filterThesePrograms.push(toJS(currentparticipantprograms.programs.name))
      }
    })
    if (programList.length > 0) {
      programList = programList.filter(
        program =>
          program.name !==
          filterThesePrograms[filterThesePrograms.indexOf(program.name)]
      )
    }
  }
  // -----------------------------------

  useEffect(() => {
    // kick off api calls for insurance list from Mobx
    participantStore.getInsurers()
    // kick off api calls for program list from Mobx
    participantStore.getPrograms()
    // TODO: refactor after v1.0.0 release
    const queueSize = Object.keys(queueStore.queues).length
    for (let i = 1; i <= queueSize; i++) queueStore.getQueue(i)
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

  const setPPIdAndSSN = e => {
    participantStore.setPPId(e.target.value)
    participantStore.setLastFourSSN(+e.target.value.substr(2))
  }

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={e => handleSubmit(e)}
      >
        <Grid item xs={12}>
          <PrevPointHeading>1. Participant Information</PrevPointHeading>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor="first-name">First name</InputLabel>
            <PrevPointInput
              name="first-name"
              value={existingParticipant.first_name}
              onChange={e => participantStore.setFirstName(e.target.value)}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor="last-name">Last name</InputLabel>
            <PrevPointInput
              name="last-name"
              value={existingParticipant.last_name}
              onChange={e => participantStore.setLastName(e.target.value)}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            required
            fullWidth
            value={existingParticipant.date_of_birth}
            onChange={e => participantStore.setDateOfBirth(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor="uuid">UUID</InputLabel>
            <PrevPointInput
              name="uuid"
              value={existingParticipant.pp_id}
              onChange={e => setPPIdAndSSN(e)}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="participant-race">Select Race</InputLabel>
            <Select
              required
              value={existingParticipant.race}
              onChange={e => participantStore.setRace(e.target.value)}
              labelId="participant-race"
            >
              <MenuItem value={"asian pi"}>Asian</MenuItem>
              <MenuItem value={"black (african american)"}>
                Black or African American
              </MenuItem>
              <MenuItem value={"latino"}>Hispanic or Latino</MenuItem>
              <MenuItem value={"native american"}>Native American</MenuItem>
              <MenuItem value={"white (caucasian)"}>
                White or Caucasian
              </MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="participant-gender">Select Gender</InputLabel>
            <Select
              required
              value={existingParticipant.gender}
              onChange={e => participantStore.setGender(e.target.value)}
              labelId="participant-gender"
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"mtf"}>Male to Female</MenuItem>
              <MenuItem value={"ftm"}>Female to Male</MenuItem>
              <MenuItem value={"gender queer"}>Gender Queer</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Has Insurance?</FormLabel>
            <RadioGroup
              aria-label="insurance"
              name="hasInsurance"
              value={existingParticipant.is_insured ? "yes" : "no"}
              onChange={e =>
                participantStore.setIsInsured(
                  e.target.value === "yes" ? true : false
                )
              }
              style={{ display: "inline" }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="insurance-select">Select Insurance</InputLabel>
            <Select
              value={existingParticipant.insurer}
              onChange={e => participantStore.setInsurer(e.target.value)}
              labelId="insurance-select"
            >
              {insurers.map((company, index) => (
                <MenuItem
                  key={index}
                  value={insurers && insurers.length > 0 ? company.id : ""}
                >
                  {insurers && insurers.length > 0 ? company.name : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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
              <MenuItem value={"_1"}>1 (Lowest)</MenuItem>
              <MenuItem value={"_2"}>2</MenuItem>
              <MenuItem value={"_3"}>3</MenuItem>
              <MenuItem value={"_4"}>4</MenuItem>
              <MenuItem value={"_5"}>5 (Highest)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="visit-notes">Add a Note</InputLabel>
            <TextField
              name="visit-notes"
              placeholder="Add a note"
              value={existingVisit.notes}
              onChange={e => participantStore.setVisitNotes(e.target.value)}
            />
          </FormControl>
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
