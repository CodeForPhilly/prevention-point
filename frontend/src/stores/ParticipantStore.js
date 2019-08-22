import { observable, action, flow, toJS } from "mobx"
import participantApi from "../api/participantApi"

class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  //participants = observable([])
  @observable participants = []

  @action setParticipant(participant, index) {
    this.participants[index] = participant
  }

  getParticipants = flow(function*() {
    try {
      const results = yield participantApi.getParticipants()
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

let participantStore = (window.participantStore = new ParticipantStore())
export default participantStore
