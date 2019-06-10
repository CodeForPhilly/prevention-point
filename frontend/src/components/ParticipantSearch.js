import React from "react"
import "../scss/participant-search.scss"
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  Grid,
} from "@material-ui/core"

const ParticipantSearch = () => {
  return (
    <Grid className="participant-search">
      <Grid align="center">
        <Typography
          className="participant-head"
          component="h5"
          variant="h5"
          gutterBottom
        >
          Participant Search
        </Typography>
        <Typography
          className="participant-reminder"
          variant="subtitle3"
          gutterBottom
        >
          <b>Reminder:</b> Search for participant profile prior to creating a
          new profile
        </Typography>
      </Grid>

      <form className="participant-search__form">
        <FormGroup className="participant-search__input">
          <FormControl>
            <InputLabel htmlFor="first_name">First Name</InputLabel>
            <Input id="first_name" name="first_name" value="" required />
          </FormControl>
        </FormGroup>
        <FormGroup className="participant-search__input">
          <FormControl>
            <InputLabel htmlFor="last_name">Last Name</InputLabel>
            <Input id="last_name" name="last_name" value="" required />
          </FormControl>
        </FormGroup>
        <FormGroup className="participant-search__input">
          <FormControl>
            <InputLabel htmlFor="user_id">User ID</InputLabel>
            <Input id="user_id" name="user_id" value="" required />
          </FormControl>
        </FormGroup>
        <Button type="submit" variant="contained" style={{ marginTop: 30 }}>
          Submit
        </Button>
      </form>
    </Grid>
  )
}

export default ParticipantSearch
