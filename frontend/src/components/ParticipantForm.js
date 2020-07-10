import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Radio from "@material-ui/core/Radio"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import FormLabel from "@material-ui/core/FormLabel"
import InputLabel from "@material-ui/core/InputLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import PrevPointInput from "./Input/PrevPointInput"
import { PrevPointHeading } from "./Typography"
import {
  PARTICIPANT_GENDER_OPTIONS,
  PARTICIPANT_RACE_OPTIONS,
} from "../constants"

function ParticipantForm(props) {
  const {
    participantInfo,
    insurers,
    setRace,
    setPPId,
    setGender,
    setInsurer,
    setLastName,
    setIsInsured,
    setFirstName,
    setDateOfBirth,
  } = props

  return (
    <Fragment>
      <Grid item xs={12}>
        <PrevPointHeading>1. Participant Information</PrevPointHeading>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <PrevPointInput
            id="firstName"
            name="firstName"
            value={participantInfo.first_name}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <PrevPointInput
            id="lastName"
            name="lastName"
            value={participantInfo.last_name}
            onChange={e => setLastName(e.target.value)}
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
          value={participantInfo.date_of_birth}
          onChange={e => setDateOfBirth(e.target.value)}
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
            value={participantInfo.pp_id}
            onChange={e => setPPId(e.target.value)}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel id="race">Select Race</InputLabel>
          <Select
            required
            name="race"
            value={participantInfo.race}
            onChange={e => setRace(e.target.value)}
            labelId="race"
          >
            {PARTICIPANT_RACE_OPTIONS.map((race, index) => (
              <MenuItem key={index} value={race.value}>
                {race.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel id="participant-gender">Select Gender</InputLabel>
          <Select
            required
            name="gender"
            value={participantInfo.gender}
            onChange={e => setGender(e.target.value)}
            labelId="participant-gender"
          >
            {PARTICIPANT_GENDER_OPTIONS.map((gender, index) => (
              <MenuItem key={index} value={gender.value}>
                {gender.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Has Insurance?</FormLabel>
          <RadioGroup
            aria-label="insurance"
            name="hasInsurance"
            value={participantInfo.is_insured ? "yes" : "no"}
            onChange={e =>
              setIsInsured(e.target.value === "yes" ? true : false)
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
            name="insurance"
            value={participantInfo.insurer}
            onChange={e => setInsurer(e.target.value)}
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
    </Fragment>
  )
}

ParticipantForm.propTypes = {
  participantInfo: PropTypes.object,
  insurers: PropTypes.array,
  setRace: PropTypes.func,
  setPPId: PropTypes.func,
  setGender: PropTypes.func,
  setInsurer: PropTypes.func,
  setLastName: PropTypes.func,
  setIsInsured: PropTypes.func,
  setFirstName: PropTypes.func,
  setDateOfBirth: PropTypes.func,
}

export default ParticipantForm
