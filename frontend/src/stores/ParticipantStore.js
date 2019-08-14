import { observable, action, flow } from "mobx"
import { createContext } from "react"
import participantApi from "../api/participantApi"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  participants = observable([])

  @action
  setParticipant(participant, index) {
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

export const ParticipantStoreContext = createContext(new ParticipantStore())
