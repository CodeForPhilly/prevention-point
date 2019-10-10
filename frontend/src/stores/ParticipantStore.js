import { observable, action, flow, toJS, decorate } from "mobx"
import { createContext } from "react"
import api from "../api"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  participants = []

  setParticipants = data => {
    this.participants = data
  }

  getParticipants = flow(function*() {
    const { ok, data } = yield api.getParticipants()
    if (ok) {
      this.setParticipants(data)
    } else {
      // TODO: Handle errors
    }
  })

  participant = toJS({
    id: "1234",
    date_of_birth: "",
    first_name: "",
    gender: "",
    last_four_ssn: "1234",
    last_name: "",
    pp_id: "",
    race: "",
    start_date: "2019-09-25",
    has_insurance: "",
    insurance_type: "",
    program: "",
    service: "",
    priority_level: "",
    note: "",
  })

  setParticipant = data => {
    this.participant = toJS(data)
  }

  getParticipant = flow(function*(id) {
    const { ok, data } = yield api.getParticipant(id)
    if (ok) {
      this.setParticipant(data)
    } else {
      // TODO: Handle errors
    }
  })

  updateParticipant = flow(function*(data) {
    const { ok } = yield api.updateParticipant(data.id, data)
    if (ok) {
      this.setParticipant(data)
    } else {
      // TODO: Handle errors
    }
  })

  createParticipant = flow(function*(participant) {
    const { ok, data } = yield api.createParticipant(participant)
    if (ok) {
      this.setParticipant(data)
    } else {
      // TODO: Handle errors
    }
  })

  // postParticipant = flow(function*(id, data) {
  //   const { ok } = yield api.postParticipant(id, data)
  //   if (ok) {
  //     this.setParticipant(data)
  //   } else {
  //     // TODO: Handle errors
  //   }
  // })

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
  setParticipants: action,
})

// let participantStore = (window.participantStore = new ParticipantStore())
export const ParticipantStoreContext = createContext(new ParticipantStore())
