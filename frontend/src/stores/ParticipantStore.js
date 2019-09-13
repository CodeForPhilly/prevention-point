import { observable, action, flow, toJS } from "mobx"
import participantApi from "../api/participantEndpoints"

class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  //participants = observable([])
  @observable participants = []

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
    this.participants = []
    try {
      const results = yield participantApi.getParticipants()
      if (results) {
        results.data.forEach((datum, index) => {
          this.participants[index] = datum
        })
      }
      return this.participants
    } catch (error) {
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

let participantStore = (window.participantStore = new ParticipantStore())
export default participantStore
