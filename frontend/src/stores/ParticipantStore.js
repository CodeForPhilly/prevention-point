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
  // list of all insurers fetched via api
  insurers = []
  // list of all programs with nested services fetched via api
  programs = []
  params = {}
  // singular participant visit
  visit = {}
  visitList = []
  // flag for triggering route to Queue table once Participant Info has bee sent
  @observable
  routeToQueueTable = false

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
    try {
      const { ok, data } = yield api.getParticipants(toJS(this.params))
      if (ok && data) {
        this.setParticipantsList(data)
      }
    } catch (error) {
      throw "ParticipantStore:  getParticipants() Failed  =>  " + error
    }
  })

  createParticipant = flow(function*() {
    try {
      const { ok, data } = yield api.createParticipant(toJS(this.participant))
      if (ok && data) {
        this.setParticipant(data)
        this.setVisitParticipantId(data.id)
        this.createVisit()
      }
    } catch (error) {
      throw "ParticipantStore:  createParticipant() Failed  =>  " + error
    }
  })

  createVisit = flow(function*() {
    try {
      const { ok, data } = yield api.createVisits(toJS(this.visit))
      if (ok && data) {
        this.setVisit(data)
        this.getFrontEndDeskEvents()
      }
    } catch (error) {
      throw "ParticipantStore:  createVisit() Failed  =>  " + error
    }
  })

  // only update basic facts about the participant
  updateParticipant = flow(function*() {
    try {
      const { ok, data } = yield api.updateParticipant(
        toJS(this.participant.id),
        toJS(this.participant)
      )
      if (ok && data) {
        this.setParticipant(data)
      }
    } catch (error) {
      throw "ParticipantStore:  updateParticipant() Failed  =>  " + error
    }
  })

  updateVisit = flow(function*() {
    try {
      const { ok } = yield api.patchVisit(toJS(this.visit.id), toJS(this.visit))
      if (ok) {
        this.setRouteToQueue(true)
      }
    } catch (error) {
      throw "ParticipantStore:  updateVisit() Failed  =>  " + error
    }
  })

  getInsurers = flow(function*() {
    try {
      const { ok, data } = yield api.getInsurers()
      if (ok && data) {
        this.setInsurers(data)
      }
    } catch (error) {
      throw "ParticipantStore:  getInsurers() Failed  =>  " + error
    }
  })

  getPrograms = flow(function*() {
    try {
      const { ok, data } = yield api.getPrograms()
      if (ok && data) {
        this.setPrograms(data)
      }
    } catch (error) {
      throw "ParticipantStore:  getPrograms() Failed  =>  " + error
    }
  })

  getProgramServiceMap = flow(function*() {
    try {
      const { ok, data } = yield api.getProgramServiceMap()
      if (ok && data) {
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
      }
    } catch (error) {
      throw "ParticipantStore:  getProgramServiceMap() Failed  =>  " + error
    }
  })

  getVisits = flow(function*() {
    try {
      const { ok, data } = yield api.getVisits()
      if (ok && data) {
        this.setVisitList(data)
      }
    } catch (error) {
      throw "ParticipantStore:  getVisits() Failed  =>  " + error
    }
  })

  getFrontEndDeskEvents = flow(function*() {
    try {
      const { ok } = yield api.postFrontDeskEvent({
        visit: this.visit.id,
        event_type: "ARRIVED",
      })
      if (ok) {
        this.setRouteToQueue(true)
      }
    } catch (error) {
      throw "ParticipantStore:  getFrontEndDeskEvents() Failed  =>  " + error
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
