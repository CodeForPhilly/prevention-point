import React, { useContext, useEffect, Fragment } from "react"
import { observer } from "mobx-react-lite"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/styles"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointHeading from "./Typography/PrevPointHeading"

const useStyles = makeStyles(() => ({
  VisitFormHeading: {
    marginTop: 40,
  },
}))

const VisitForm = observer(() => {
  const classes = useStyles()
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore

  // default values need to be set for the Select components to work
  if (!Object.keys(participantStore.visit).length) {
    participantStore.setDefaultVisit()
  }

  useEffect(() => {
    // kick off api calls for program list from Mobx
    participantStore.getPrograms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // set service listings based on chosen program
  const findAndSaveServiceListings = e => {
    const serviceListing = participantStore.programs.find(
      program => program.id === e.target.value
    )
    participantStore.setServiceList(serviceListing.services)
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <PrevPointHeading className={classes.VisitFormHeading}>
          2. Check In Participant
        </PrevPointHeading>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel id="program-select">Select Program</InputLabel>
          <Select
            required
            value={participantStore.visit.program}
            onChange={e => {
              participantStore.setVisitProgram(e.target.value)
              participantStore.setVisitService("")
              findAndSaveServiceListings(e)
            }}
            labelId="program-select"
          >
            {participantStore.programs.map(program => (
              <MenuItem
                key={program.id}
                value={
                  participantStore.programs &&
                  participantStore.programs.length > 0
                    ? program.id
                    : ""
                }
              >
                {participantStore.programs &&
                participantStore.programs.length > 0
                  ? program.name
                  : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel id="service-select">Select Service</InputLabel>
          {/* eslint-disable-next-line prettier/prettier */}
          {participantStore.visit.program && participantStore.services.length > 0 ? (
            <Select
              required
              value={participantStore.visit.service}
              onChange={e => participantStore.setVisitService(e.target.value)}
              labelId="service-select"
            >
              {participantStore.services.map(service => (
                <MenuItem
                  key={service.id}
                  value={participantStore.services.length ? service.id : ""}
                >
                  {participantStore.services.length ? service.name : ""}
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
            value={participantStore.visit.urgency}
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
        <TextField
          label="Add a Note"
          fullWidth
          name="visit-notes"
          value={participantStore.visit.notes}
          onChange={e => participantStore.setVisitNotes(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}></Grid>
    </Fragment>
  )
})

export default VisitForm
