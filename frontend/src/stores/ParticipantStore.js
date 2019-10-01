import { observable, action, flow, toJS, decorate } from "mobx"
import { createContext } from "react"
import api from "../api"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  participants = []
  userId = ""
  firstName = ""
  lastName = ""

  setParticipants = data => {
    this.participants = data
  }
  setUserId(userId) {
    this.userId = userId
  }
  setFirstName(firstName) {
    this.firstName = firstName
  }
  setLastName(lastName) {
    this.lastName = lastName
  }

  getParticipants = flow(function*() {
    const { ok, data } = yield api.getParticipants()
    if (ok) {
      this.setParticipants(data)
    } else {
      // TODO: Handle errors
    }
  })

  filter(id, first, last) {
    //Filter on ID first, then name. Return a Participant or null
    const arr = toJS(this.participants)
    if (typeof id !== "undefined" && id !== null) {
      return arr.filter(x => x.pp_id === id)
    } else if (
      typeof first !== "undefined" &&
      first !== null &&
      typeof last !== "undefined" &&
      last !== null
    ) {
      return arr.filter(x => x.first_name === first && x.last_name === last)
    } else {
      return null
    }
  }
}

decorate(ParticipantStore, {
  participants: observable,
  userId: observable,
  firstName: observable,
  lastName: observable,
  setParticipants: action,
  setUserId: action,
  setFirstName: action,
  setLastName: action,
})

//let participantStore = (window.participantStore = new ParticipantStore())
export const ParticipantStoreContext = createContext(new ParticipantStore())
