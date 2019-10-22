import { observable, action, flow, toJS, decorate } from "mobx"
import { createContext } from "react"
import api from "../api"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  participant = {
    userId: "",
    firstName: "",
    lastName: "",
  }

  participants = []

  storeUserId = data => {
    this.participant.userId = data
  }
  storeFirstName = data => {
    this.participant.firstName = data
  }
  storeLastName = data => {
    this.participant.lastName = data
  }

  storeParticipant = data => {
    this.participant = data
  }
  storeParticipantList = data => {
    this.participants = data
  }

  getStoredParticipant = () => {
    return toJS(this.participant)
  }
  getStoredParticipantList = () => {
    return toJS(this.participants)
  }

  getParticipants = flow(function*() {
    const { ok, data } = yield api.getParticipants()
    if (ok) {
      this.storeParticipantList(data)
    } else {
      // TODO: Handle errors
    }
  })

  searchForParticipant = () => {
    // console.log("search for participant:")
    let participant = toJS(this.participant)
    // console.log(participant)
    if (participant.userId) {
      this.getParticipantById(participant.userId)
    } else {
      this.getParticipantByName(participant.firstName, participant.lastName)
    }
  }

  getParticipantById = flow(function*(id) {
    const { ok, data } = yield api.getParticipantById(id)
    if (ok) {
      // console.log("get participant by id response:")
      // console.log(data)
      // Regardless of how many participants are returned, we store them in a list
      this.storeParticipantList(data)
    } else {
      // TODO: Handle errors
    }
  })

  getParticipantByName = flow(function*({ firstName, lastName }) {
    const { ok, data } = yield api.getParticipantById(firstName, lastName)
    if (ok) {
      // console.log(data)
      this.storeParticipantList(data)
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
  participant: observable,
  storeUserId: action,
  storeFirstName: action,
  storeLastName: action,
  storeParticipant: action,
  storeParticipantList: action,
  getStoredParticipant: action,
  getStoredParticipantList: action,
  searchForParticipant: action,
})

// let participantStore = (window.participantStore = new ParticipantStore())
export const ParticipantStoreContext = createContext(new ParticipantStore())
