import React, { useState, useContext } from "react"
import { rootStoreContext } from "../stores/RootStore"
import "../scss/participant-search.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Redirect } from "react-router-dom"
import { observer } from "mobx-react-lite"

const UserSearch = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore

  const [errorState, setErrorState] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [redirectState, setRedirectState] = useState(false)

  const handleSubmit = e => {
    if (e) {
      e.preventDefault()
    }
    // Validate that a user id or a first name last name paring exist on the form
    if (
      "" === participantsStore.userId &&
      "" === participantsStore.firstName &&
      "" === participantsStore.lastName
    ) {
      setErrorMessage("Need to enter a user id or a name")
      setErrorState(true)
    } else {
      setRedirectState(true)
    }
  }

  if (redirectState) return <Redirect to={{ pathname: "/participant" }} />

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
                value={participantsStore.userId}
                onChange={e => participantsStore.setUserId(e.target.value)}
                className={errorState ? "error" : ""}
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
                value={participantsStore.firstName}
                onChange={e => participantsStore.setFirstName(e.target.value)}
                className={errorState ? "error" : ""}
              />
            </FormControl>
          </FormGroup>
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input
                id="last_name"
                name="last_name"
                value={participantsStore.lastName}
                onChange={e => participantsStore.setLastName(e.target.value)}
                className={errorState ? "error" : ""}
              />
            </FormControl>
          </FormGroup>
          <p className="error-message">{errorMessage}</p>
          <Button type="submit" variant="contained" style={{ marginTop: 30 }}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
})

export default UserSearch
