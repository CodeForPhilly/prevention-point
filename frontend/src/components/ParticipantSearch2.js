import React from "react"
import "../scss/participant-search.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Drawer from "@material-ui/core/Drawer"

import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"



const ParticipantSearch2 = () => {
  return (
    <div className="participant-search">

    <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        {/*<Typography >Expansion Panel 1</Typography>*/}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>


      <div align="left">
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
          variant="body1"
          gutterBottom
        >
          <b>Reminder:</b> Search for participant profile prior to creating a
          new profile
        </Typography>
      <form className="participant-search__form">
        <FormGroup className="participant-search__input">
          <FormControl>
            <InputLabel htmlFor="user_id">User ID</InputLabel>
            <Input id="user_id" name="user_id" value="" required />
          </FormControl>
        </FormGroup>
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
        <Button type="submit" variant="contained" style={{ marginTop: 30 }}>
          Submit
        </Button>
      </form>
     </div>
    </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  )
}

export default ParticipantSearch2
