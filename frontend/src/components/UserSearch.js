import React, { useState } from "react"
import "../scss/participant-search.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const UserSearch = () => {
  const [userId, setUserId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleSubmit = e => {
    if (e) {
      e.preventDefault()
    }
    // Validate that a user id or a first name last name paring exist on the form
    // Go to results page
    // const login = () => {
    //   rootStore.authStore.login(username, password)
    // }
  }

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
        <form className="participant-search__form" onSubmit={handleSubmit}>
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="user_id">User ID</InputLabel>
              <Input
                id="user_id"
                name="user_id"
                required
                value={userId}
                onChange={e => setUserId(e.target.value)}
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
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={e => setLastName(e.target.value)}
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
