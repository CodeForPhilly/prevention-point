import { observable, action, flow } from "mobx"
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
}

let participantStore = (window.participantStore = new ParticipantStore())
export default participantStore
