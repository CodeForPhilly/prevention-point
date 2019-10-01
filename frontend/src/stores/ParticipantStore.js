import { observable, action, flow, toJS } from "mobx"
import { createContext } from "react"
import api from "../api"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  //participants = observable([])
  @observable participants = []
  @observable userId = ""
  @observable firstName = ""
  @observable lastName = ""

  @action setParticipant(participant, index) {
    this.participants[index] = participant
  }
  @action setUserId(userId) {
    this.userId = userId
  }
  @action setFirstName(firstName) {
    this.firstName = firstName
  }
  @action setLastName(lastName) {
    this.lastName = lastName
  }

  getParticipants = flow(function*() {
    try {
      const results = yield api.getParticipants()
      if (results) {
        results.data.forEach((datum, index) => {
          this.setParticipant(datum, index)
        })
      }
    } catch (error) {
      // TODO: Handle errors
      //console.log(error)
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

//const participantStore = (window.participantStore = new ParticipantStore())
export const ParticipantStoreContext = createContext(new ParticipantStore())
