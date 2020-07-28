import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import { PrevPointHeading } from "./Typography"
import { URGENCY_OPTIONS } from "../constants"

function VisitForm(props) {
  const {
    visitInfo,
    programList,
    serviceList,
    setVisitProgram,
    setVisitService,
    setVisitUrgency,
    setVisitNotes,
  } = props
  return (
    <>
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
            value={visitInfo.program}
            onChange={e => setVisitProgram(e.target.value)}
            labelId="program-select"
          >
            {programList.map(program => (
              <MenuItem
                key={program.id}
                value={programList && programList.length > 0 ? program.id : ""}
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
          {visitInfo.program && serviceList.length > 0 ? (
            <Select
              required
              value={visitInfo.service}
              onChange={e => setVisitService(e.target.value)}
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
            value={visitInfo.urgency}
            onChange={e => setVisitUrgency(e.target.value)}
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
          value={visitInfo.notes}
          onChange={e => setVisitNotes(e.target.value)}
        />
      </Grid>
    </>
  )
}
VisitForm.propTypes = {
  visitInfo: PropTypes.object,
  programList: PropTypes.array,
  serviceList: PropTypes.array,
  setVisitProgram: PropTypes.func,
  setVisitService: PropTypes.func,
  setVisitUrgency: PropTypes.func,
  setVisitNotes: PropTypes.func,
}

export default VisitForm
