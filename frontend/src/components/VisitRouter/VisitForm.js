import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import PrevPointInput from "../Input/PrevPointInput"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import { PrevPointHeading } from "../Typography"
import { URGENCY_OPTIONS } from "../../constants"

const VisitForm = ({
  visitInfo,
  programList,
  serviceList,
  handleVisitChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <PrevPointHeading>
          <br />
          <br />
          2. Check In Participant
        </PrevPointHeading>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl>
          <InputLabel id="program-select">Choose Program</InputLabel>
          <Select
            required
            name="program"
            value={visitInfo.program}
            onChange={e => handleVisitChange(e.target)}
            labelId="program-select"
          >
            {programList.map(program => (
              <MenuItem key={program.id} value={program.id}>
                {program.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <InputLabel id="service-select">Select Service</InputLabel>
          {visitInfo.program ? (
            <Select
              required
              name="service"
              value={visitInfo.service}
              onChange={e => handleVisitChange(e.target)}
              labelId="service-select"
            >
              {serviceList.map(service => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          ) : null}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <InputLabel id="urgency-level">Select Urgency Level</InputLabel>
          <Select
            name="urgency"
            value={visitInfo.urgency}
            onChange={e => handleVisitChange(e.target)}
            labelId="urgency-level"
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
        <FormControl>
          <InputLabel htmlFor="addANote">Add a Note</InputLabel>
          <PrevPointInput
            fullWidth
            multiline
            name="notes"
            id="addANote"
            value={visitInfo.notes}
            onChange={e => handleVisitChange(e.target)}
          />
        </FormControl>
      </Grid>
    </>
  )
}
VisitForm.propTypes = {
  visitInfo: PropTypes.object,
  programList: PropTypes.array,
  serviceList: PropTypes.array,
  handleVisitChange: PropTypes.func,
}

export default VisitForm
