import { observable, action, flow, toJS, decorate } from "mobx"
import { createContext } from "react"
import api from "../api"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // Store Params
  participants = []
  params = {}

  // Setters
  setParticipantsList = data => {
    this.participants = data
  }
  setUserIdParam = data => {
    this.params.pp_id = data
  }
  setFirstNameParam = data => {
    this.params.first_name = data
  }
  setLastNameParam = data => {
    this.params.last_name = data
  }

  // Getters
  getParticipantsList = () => {
    return toJS(this.participants)
  }
  getParams = () => {
    return toJS(this.params)
  }

  // API Calls
  getParticipants = flow(function*() {
    const { ok, data } = yield api.getParticipants(toJS(this.params))
    if (ok) {
      this.setParticipantsList(data)
    } else {
      // TODO: Handle errors
    }
  })
}

decorate(ParticipantStore, {
  participants: observable,
  params: observable,
  setUserIdParam: action,
  setFirstNameParam: action,
  setLastNameParam: action,
  setParticipantsList: action,
  getParticipantsList: action,
  getParams: action,
  getParticipants: action,
})

// let participantStore = (window.participantStore = new ParticipantStore())
export const ParticipantStoreContext = createContext(new ParticipantStore())
