import React, { Fragment, useContext, useEffect } from "react"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
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
import PrevPointInput from "./PrevPointInput"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointHeading from "./Typography/PrevPointHeading"

const ParticipantForm = observer(() => {
  const rootStore = useContext(rootStoreContext)
  // particiant store derived from root store
  const participantStore = rootStore.ParticipantStore
  const insurers = toJS(participantStore.insurers)

  // default values need to be set for the Select components to work
  if (!Object.keys(participantStore.participant).length) {
    participantStore.setDefaultParticipant()
  }

  useEffect(() => {
    // kick off api calls for insurance list from Mobx
    participantStore.getInsurers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setPPIdAndSSN = e => {
    participantStore.setPPId(e.target.value)
    participantStore.setLastFourSSN(e.target.value.slice(2))
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <PrevPointHeading>1. Participant Information</PrevPointHeading>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel htmlFor="first-name">First name</InputLabel>
          <PrevPointInput
            name="first-name"
            value={participantStore.participant.first_name}
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
            value={participantStore.participant.last_name}
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
          value={participantStore.participant.date_of_birth}
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
            value={participantStore.participant.pp_id}
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
            value={participantStore.participant.race}
            onChange={e => participantStore.setRace(e.target.value)}
            labelId="participant-race"
          >
            <MenuItem value={"asian pi"}>Asian</MenuItem>
            <MenuItem value={"black (african american)"}>
              Black or African American
            </MenuItem>
            <MenuItem value={"latino"}>Hispanic or Latino</MenuItem>
            <MenuItem value={"native american"}>Native American</MenuItem>
            <MenuItem value={"white (caucasian)"}>White or Caucasian</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel id="participant-gender">Select Gender</InputLabel>
          <Select
            required
            value={participantStore.participant.gender}
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
            value={participantStore.participant.is_insured ? "yes" : "no"}
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
            value={participantStore.participant.insurer}
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
    </Fragment>
  )
})

export default ParticipantForm
