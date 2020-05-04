import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"

import Input from "@material-ui/core/Input"
import Container from "@material-ui/core/Container"
import FormGroup from "@material-ui/core/FormGroup"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"

import PrevPointCopy from "./Typography/PrevPointCopy"
import PrevPointButton from "./PrevPointButton"
import PrevPointHeading from "./Typography/PrevPointHeading"
import { rootStoreContext } from "../stores/RootStore"

const UserSearch = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore
  const history = useHistory()

  const handleSubmit = e => {
    if (e) {
      e.preventDefault()
    }
    // Validate that a user id or a first name last name paring exist on the form
    if (!participantsStore.params) {
      participantsStore.setErrorMessageForUserSearch(
        "Need to enter a user id or a name"
      )
      participantsStore.setErrorMessageForUserSearch(true)
    } else {
      participantsStore.getParticipants()
      history.push("/participants")
    }
  }

  return (
    <Container className="participant-search">
      <div>
        <PrevPointHeading className="participant-search__heading">
          Participant Search
        </PrevPointHeading>
        <PrevPointCopy className="participant-search__copy">
          <b>Reminder:</b> Search for participant profile prior to creating a
          new profile
        </PrevPointCopy>
        <form className="participant-search__form" onSubmit={handleSubmit}>
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="user_id">User ID</InputLabel>
              <Input
                id="user_id"
                name="user_id"
                value={participantsStore.params.userId}
                onChange={e => participantsStore.setUserIdParam(e.target.value)}
                className={participantsStore.errorState ? "error" : ""}
              />
            </FormControl>
          </FormGroup>
          <PrevPointHeading className="participant-search__heading">
            Or
          </PrevPointHeading>
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input
                id="first_name"
                name="first_name"
                value={participantsStore.params.firstName}
                onChange={e =>
                  participantsStore.setFirstNameParam(e.target.value)
                }
                className={participantsStore.errorState ? "error" : ""}
              />
            </FormControl>
          </FormGroup>
          <FormGroup className="participant-search__input">
            <FormControl>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input
                id="last_name"
                name="last_name"
                value={participantsStore.params.lastName}
                onChange={e =>
                  participantsStore.setLastNameParam(e.target.value)
                }
                className={participantsStore.errorState ? "error" : ""}
              />
            </FormControl>
          </FormGroup>
          <PrevPointCopy className="error-message">
            {participantsStore.errorMessage}
          </PrevPointCopy>
          <PrevPointButton
            type="submit"
            disabled={participantsStore.toggleSearch}
          >
            Submit
          </PrevPointButton>
        </form>
      </div>
    </Container>
  )
})

export default UserSearch
