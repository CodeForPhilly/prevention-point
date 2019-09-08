import React, { useState } from "react"
import "../scss/participant-search.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const UserSearch = () => {
  const inputState = useState({
    userId: "",
    firstName: "",
    lastName: "",
  })

  return (
    <div className="participant-search">
      <div align="center">
        <Typography
          className="participant-head"
          component="h5"
          variant="h5"
          gutterBottom
        >
          <b>Participant Search</b>
        </Typography>
        <Typography
          className="participant-reminder"
          variant="body2"
          gutterBottom
        >
          <b>Reminder:</b> Search for participant profile prior to creating a
          new profile
        </Typography>
        <form className="participant-search__form">
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="user_id">User ID</InputLabel>
              <Input
                id="user_id"
                name="user_id"
                required
                value={inputState[0].userId}
                onChange={event => {
                  const newUserId = event.target.value
                  inputState[1](prevInputState => ({
                    userId: newUserId,
                    firstName: prevInputState.firstName,
                    lastName: prevInputState.lastName,
                  }))
                }}
              />
            </FormControl>
          </FormGroup>
          <Typography
            className="participant-head"
            component="h5"
            variant="h5"
            gutterBottom
          >
            <b>Or</b>
          </Typography>
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input
                id="first_name"
                name="first_name"
                required
                value={inputState[0].firstName}
                onChange={event => {
                  const newFirstName = event.target.value
                  inputState[1](prevInputState => ({
                    userId: prevInputState.userId,
                    firstName: newFirstName,
                    lastName: prevInputState.lastName,
                  }))
                }}
              />
            </FormControl>
          </FormGroup>
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input
                id="last_name"
                name="last_name"
                required
                value={inputState[0].lastName}
                onChange={event => {
                  const newLastName = event.target.value
                  inputState[1](prevInputState => ({
                    userId: prevInputState.userId,
                    firstName: prevInputState.firstName,
                    lastName: newLastName,
                  }))
                }}
              />
            </FormControl>
          </FormGroup>
          <Button type="submit" variant="contained" style={{ marginTop: 30 }}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UserSearch
