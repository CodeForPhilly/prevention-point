import { observable, action, flow } from "mobx"
import participantApi from "../api/participantApi"

class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
    this.getParticipants()
  }

  //participants = observable([])
  @observable participants = []

  @observable todos = ["buy milk", "buy eggs"]

  @action setParticipant(participant, index) {
    this.participants[index] = participant
  }

  getParticipants = flow(function*() {
    try {
      const data = yield participantApi.getParticipants()
      if (data) {
        data.forEach((datum, index) => {
          this.setParticipant(datum, index)
        })
      }
    } catch (error) {
      // TODO: Handle errors
    }
  })
}

let participantStore = (window.participantStore = new ParticipantStore())
export default participantStore
// uncomment this line to have the store on the dom and testable
// const store = (window.store = new ParticipantStore())
// store.getParticipants()
// export const participantStore = store

//export const participantStoreContext = createContext(new ParticipantStore())
//export const participantStoreContext = createContext(store)
