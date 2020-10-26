import { observable, action, flow, toJS, computed } from "mobx"
import { createContext } from "react"
import { format } from "date-fns"
import api from "../api"
import { SEARCH } from "../constants"

export class ParticipantStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // Store Params
  // full participant list
  @observable participants = []
  // single participant for editing
  @observable participant = {}
  // list of all insurers fetched via api
  @observable insurers = []
  // list of all programs with nested services fetched via api
  @observable programs = []
  // singular participant visit
  @observable visit = {}
  // flag for triggering route to Queue table once Participant Info has bee sent
  @observable routeToQueueTable = false
  @observable services = []
  @observable visitList = []
  @observable isEditing = false
  // participant search
  @observable sidebarView = SEARCH
  @observable sites = []
  @observable currentSite = ""

  @computed get hasVisit() {
    return this.visitList.map(visit => {
      return visit.participant === this.participant.id ? true : false
    })
  }

  // Setters
  @action setDefaultParticipant = () => {
    this.participant = {
      id: null,
      first_name: "",
      last_name: "",
      last_four_ssn: 0,
      date_of_birth: "",
      start_date: this.createStartDate(),
      pp_id: "",
      race: "",
      gender: "",
      is_insured: false,
      insuranceType: "",
      insurer: "",
    }
  }
  @action setDefaultVisit = () => {
    this.visit = {
      id: null,
      participant: null,
      program: "",
      service: "",
      notes: "",
      urgency: "",
    }
  }
  // ParticipantList Component Actions
  @action setParticipantsList = data => {
    this.participants = data
  }

  @action setIsEditing = isEditing => {
    // boolean
    this.isEditing = isEditing
  }
  // Full Participant and Visit Assignment Actions
  @action setParticipant = data => {
    this.participant = data
  }
  @action setVisit = data => {
    this.visit = data
  }

  // Insurance and Programs Actions
  @action setInsurers = data => {
    this.insurers = data
  }
  @action setPrograms = data => {
    this.programs = data.filter(item => !item.is_frozen)
  }
  @action setRouteToQueue = data => {
    this.routeToQueueTable = data
  }
  // Participant State Actions
  @action handleParticipantChange = ({ name, value }) => {
    switch (name) {
      case "is_insured":
        this.participant.is_insured = value === "true"
        if (!this.participant.is_insured) {
          this.participant.insurer = ""
        }
        break
      case "pp_id":
        this.setPPId(value)
        break
      default:
        this.participant[name] = value
    }
  }
  @action setPPId = data => {
    this.participant.pp_id = data
    this.setLastFourSSN(data.slice(2))
  }
  @action setLastFourSSN = data => {
    this.participant.last_four_ssn = data
  }

  @action setVisitProgram = data => {
    this.setVisitService("")
    const serviceListing = this.programs.find(program => program.id === data)
    this.visit.program = data
    this.setServiceList(serviceListing.services)
  }

  @action handleVisitChange = ({ name, value }) => {
    switch (name) {
      case "program":
        this.setVisitProgram(value)
        break
      default:
        this.visit[name] = value
    }
  }

  @action setVisitService = data => {
    this.visit.service = data
  }
  @action setVisitParticipantId = data => {
    this.visit.participant = data
  }
  @action setServiceList = data => {
    this.services = data
  }
  @action setVisitsList = data => {
    this.visitList = data
  }

  @action setSidebarView = sidebarView => {
    this.sidebarView = sidebarView
  }

  @action setSites = data => {
    this.sites = data
  }

  @action setCurrentSite = currentSite => {
    this.currentSite = currentSite
  }

  // Utils
  createStartDate = () => {
    return format(new Date(), "yyyy-MM-dd")
  }

  // API Calls
  // called on  =>  QueueTable.js
  getInsurers = flow(function*() {
    try {
      const { ok, data } = yield api.getInsurers()
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setInsurers(data)
    } catch (error) {
      throw `ParticipantStore:  getInsurers() Failed  =>  ${error}`
    }
  })
  getPrograms = flow(function*() {
    try {
      const { ok, data } = yield api.getPrograms()
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setPrograms(data)
      if (
        this.participant.id &&
        this.visit.id &&
        this.visit.program &&
        this.visit.service &&
        this.programs.length > 0
      ) {
        // preload chosen services based on visit programs
        const preloadedServices = this.programs.find(
          program => program.id === this.visit.program
        )
        this.setServiceList(preloadedServices.services)
      }
    } catch (error) {
      throw `ParticipantStore:  getPrograms() Failed  =>  ${error}`
    }
  })
  getParticipant = flow(function*() {
    try {
      const { ok, data } = yield api.getParticipantById(
        toJS(this.participant.id)
      )
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setParticipant(data)
    } catch (error) {
      throw `ParticipantStore:  getParticipant() Failed  =>  ${error}`
    }
  })
  // called on  =>  ParticipantList.js
  getParticipants = flow(function*(params) {
    try {
      const { ok, data } = yield api.getParticipants(toJS(params))
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setParticipantsList(data)
    } catch (error) {
      throw `ParticipantStore:  getParticipants() Failed  =>  ${error}`
    }
  })
  // called on  =>  ParticipantInfo.js
  // andVisit temporary hack, this logic should be seperated out when creating VisitView
  createParticipant = flow(function*(andVisit = true) {
    if (this.routeToQueueTable) {
      this.setRouteToQueue(false)
    }
    try {
      const { ok, data } = yield api.createParticipant(toJS(this.participant))
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setParticipant(data)
      if (andVisit) {
        return this.createVisit()
      }
      this.setRouteToQueue(true)
    } catch (error) {
      throw `ParticipantStore:  createParticipant() Failed  =>  ${error}`
    }
  })
  createVisit = flow(function*() {
    try {
      this.setVisitParticipantId(this.participant.id)
      const { ok, data } = yield api.createVisits(toJS(this.visit))
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setVisit(data)
      this.createNewFrontEndDeskEvents()
    } catch (error) {
      throw `ParticipantStore:  createVisit() Failed  =>  ${error}`
    }
  })
  createNewFrontEndDeskEvents = flow(function*() {
    if (this.routeToQueueTable) {
      this.setRouteToQueue(false)
    }
    try {
      const { ok } = yield api.postFrontDeskEvent({
        visit: this.visit.id,
        event_type: "ARRIVED",
      })
      if (!ok) {
        throw "a placeholder error string!"
      }
      this.setRouteToQueue(true)
    } catch (error) {
      throw `ParticipantStore:  createNewFrontEndDeskEvents() Failed  =>  ${error}`
    }
  })
  getVisits = flow(function*() {
    try {
      const { ok, data } = yield api.getVisits()
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setVisitsList(data)
    } catch (error) {
      throw `ParticipantStore:  getVisits() Failed  =>  ${error}`
    }
  })
  // called on  =>  ParticipantInfo.js
  // only update basic facts about the participant
  updateParticipant = flow(function*() {
    try {
      const { ok, data } = yield api.updateParticipant(
        toJS(this.participant.id),
        toJS(this.participant)
      )
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setParticipant(data)
      this.setIsEditing(false)
    } catch (error) {
      throw `ParticipantStore:  updateParticipant() Failed  =>  ${error}`
    }
  })
  // called on  =>  ParticipantInfo.js
  updateVisit = flow(function*() {
    if (this.routeToQueueTable) {
      this.setRouteToQueue(false)
    }
    try {
      const { ok } = yield api.patchVisit(toJS(this.visit.id), toJS(this.visit))
      if (!ok) {
        throw "a placeholder error string!"
      }
      this.setRouteToQueue(true)
    } catch (error) {
      throw `ParticipantStore:  updateVisit() Failed  =>  ${error}`
    }
  })
  getSites = flow(function*() {
    try {
      const { ok, data } = yield api.getSites()
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
      this.setSites(data)
    } catch (error) {
      throw `ParticipantStore:  getSites() Failed  =>  ${error}`
    }
  })
  createSEP = flow(function*({
    program,
    urgency,
    participant,
    needles_in,
    needles_out,
    site,
  }) {
    try {
      //{"participant":["Incorrect type. Expected pk value, received str."]}
      const { visitOk, visitData } = yield api.createVisits({
        program: program,
        urgency: urgency,
        participant: participant,
      })
      if (!visitOk || !visitData) {
        throw "a placeholder error string!"
      }
      const { ok, data } = yield api.createSEP({
        needles_in: needles_in,
        needles_out: needles_out,
        site: site,
        visit: visitData,
      })
      if (!ok || !data) {
        throw "a placeholder error string!"
      }
    } catch (error) {
      throw `ParticipantStore:  createSEP() Failed  =>  ${error}`
    }
  })
}

export const ParticipantStoreContext = createContext(new ParticipantStore())
