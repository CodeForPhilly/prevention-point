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

const ParticipantForm = ({
  participantInfo,
  insurers,
  isDisabled,
  handleParticipantChange,
}) => {
  return (
    <Fragment>
      <Grid item xs={12}>
        <PrevPointHeading>1. Participant Information</PrevPointHeading>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl disabled={isDisabled}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <PrevPointInput
            id="firstName"
            name="first_name"
            value={participantInfo.first_name}
            onChange={e => handleParticipantChange(e.target)}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl disabled={isDisabled}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <PrevPointInput
            id="lastName"
            name="last_name"
            value={participantInfo.last_name}
            onChange={e => handleParticipantChange(e.target)}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          required
          disabled={isDisabled}
          fullWidth
          value={participantInfo.date_of_birth}
          onChange={e => handleParticipantChange(e.target)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl disabled={isDisabled}>
          <InputLabel htmlFor="uuid">UUID</InputLabel>
          <PrevPointInput
            id="uuid"
            name="pp_id"
            value={participantInfo.pp_id}
            onChange={e => handleParticipantChange(e.target)}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl disabled={isDisabled}>
          <InputLabel id="race">Select Race</InputLabel>
          <Select
            required
            name="race"
            value={participantInfo.race}
            onChange={e => handleParticipantChange(e.target)}
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
        <FormControl disabled={isDisabled}>
          <InputLabel id="participant-gender">Select Gender</InputLabel>
          <Select
            required
            name="gender"
            value={participantInfo.gender}
            onChange={e => handleParticipantChange(e.target)}
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
        <FormControl disabled={isDisabled} component="fieldset">
          <FormLabel component="legend">Has Insurance?</FormLabel>
          <RadioGroup
            aria-label="insurance"
            name="is_insured"
            value={participantInfo.is_insured}
            onChange={e => handleParticipantChange(e.target)}
            style={{ display: "inline" }}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {participantInfo.is_insured && (
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="insurance-select">Select Insurance</InputLabel>
            <Select
              name="insurer"
              value={participantInfo.insurer}
              onChange={e => handleParticipantChange(e.target)}
              labelId="insurance-select"
            >
              {insurers.map(company => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name || ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Fragment>
  )
}

ParticipantForm.propTypes = {
  participantInfo: PropTypes.object,
  isDisabled: PropTypes.bool,
  insurers: PropTypes.array,
  handleParticipantChange: PropTypes.func,
}

ParticipantForm.defaultProps = {
  isDisabled: false,
}

export default ParticipantForm
