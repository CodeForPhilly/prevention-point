import { observable, action, flow, toJS } from "mobx"
import { createContext } from "react"
import api from "../api"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  //participants = observable([])
  @observable participants = []

  @action
  setParticipants(participants, data) {
    participants = data
  }

  getParticipants = flow(function*(participants) {
    const { ok, data } = yield api.getParticipants()
    if (ok) {
      this.setParticipants(participants, data)
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

export const ParticipantStoreContext = createContext(new ParticipantStore())
