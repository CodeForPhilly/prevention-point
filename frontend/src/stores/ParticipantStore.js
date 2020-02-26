import { observable, action, flow, toJS, decorate } from "mobx"
import { createContext } from "react"
import api from "../api"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // Store Params
  participants = []
  participant = {}
  insurers = []
  programs = []
  params = {}
  visit = {}
  visitList = []
  @observable routeToQueueTable = false

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
  setIdParam = data => {
    this.participant.id = data
  }
  setParticipant = data => {
    this.participant = data
  }
  setInsurers = data => {
    this.insurers = data
  }
  setPrograms = data => {
    this.programs = data
  }
  setVisit = data => {
    this.visit = data
  }
  setVisitList = data => {
    this.visitList = data
  }
  setVisitParticipantId = data => {
    this.visit.participant = data
  }
  setRouteToQueue = data => {
    this.routeToQueueTable = data
  }
  setProgramServiceValue = data => {
    delete this.visit.program
    delete this.visit.service
    this.visit.program_service_map = data
  }

  // Getters
  getParticipantsList = () => {
    return toJS(this.participants)
  }
  getParticipant = () => {
    return toJS(this.participant)
  }
  getParams = () => {
    return toJS(this.params)
  }
  getParticipant = () => {
    return toJS(this.participant)
  }
  getInsuranceList = () => {
    return toJS(this.insurers)
  }
  getProgramList = () => {
    return toJS(this.programs)
  }
  getVisitsList = () => {
    return toJS(this.visitList)
  }
  getVisit = () => {
    return toJS(this.visit)
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

  createParticipant = flow(function*() {
    const { ok, data } = yield api.createParticipant(toJS(this.participant))
    if (ok) {
      this.setParticipant(data)
      this.setVisitParticipantId(data.id)
      this.createVisit()
    } else {
      // TODO: Handle errors
    }
  })

  // only update basic facts about the participant
  updateParticipant = flow(function*() {
    const { ok, data } = yield api.updateParticipant(
      toJS(this.participant.id),
      toJS(this.participant)
    )
    if (ok) {
      this.setParticipant(data)
      this.setRouteToQueue(true)
    } else {
      // TODO: Handle errors
    }
  })

  getInsurers = flow(function*() {
    const { ok, data } = yield api.getInsurers()
    if (ok) {
      this.setInsurers(data)
    } else {
      // TODO: Handle errors
    }
  })

  getPrograms = flow(function*() {
    const { ok, data } = yield api.getPrograms()
    if (ok) {
      this.setPrograms(data)
    } else {
      // TODO: Handle errors
    }
  })

  createVisit = flow(function*() {
    const { ok, data } = yield api.createVisits(toJS(this.visit))
    if (ok) {
      this.setVisit(data)
      this.getFrontEndDeskEvents()
    } else {
      // TODO: Handle errors
    }
  })

  updateVisit = flow(function*() {
    const { ok } = yield api.patchVisit(toJS(this.visit.id), toJS(this.visit))
    if (ok) {
      this.setRouteToQueue(true)
    } else {
      // TODO: Handle errors
    }
  })

  getProgramServiceMap = flow(function*() {
    const { ok, data } = yield api.getProgramServiceMap()
    if (ok) {
      // eslint-disable-next-line no-console
      console.log(data)
      let programServiceObject = data.find(val => {
        if (
          val.program.id === toJS(this.visit.program) &&
          val.service.id === toJS(this.visit.service)
        ) {
          return val
        }
      })
      this.setProgramServiceValue(programServiceObject.id)
      this.updateVisit()
    } else {
      // TODO: Handle errors
    }
  })

  getVisits = flow(function*() {
    const { ok, data } = yield api.getVisits()
    if (ok) {
      this.setVisitList(data)
    } else {
      // TODO: Handle errors
    }
  })

  getFrontEndDeskEvents = flow(function*() {
    const { ok } = yield api.postFrontDeskEvent({
      visit: this.visit.id,
      event_type: "ARRIVED",
    })
    if (ok) {
      this.setRouteToQueue(true)
    } else {
      // TODO: Handle errors
    }
  })
}

decorate(ParticipantStore, {
  participants: observable,
  params: observable,
  participant: observable,
  insurers: observable,
  programs: observable,
  visit: observable,
  setUserIdParam: action,
  setFirstNameParam: action,
  setLastNameParam: action,
  setParticipantsList: action,
  setPrograms: action,
  setIdParam: action,
  setVisitParticipantId: action,
  setVisit: action,
  getParticipantsList: action,
  getParams: action,
  getParticipants: action,
  getInsurers: action,
  getInsuranceList: action,
  getParticipant: action,
  createParticipant: action,
  updateParticipant: action,
  createVisit: action,
  updateVisit: action,
  setParticipant: action,
  setInsurers: action,
  getProgramList: action,
  getPrograms: action,
  getProgramServiceMap: action,
})

// let participantStore = (window.participantStore = new ParticipantStore())
export const ParticipantStoreContext = createContext(new ParticipantStore())
