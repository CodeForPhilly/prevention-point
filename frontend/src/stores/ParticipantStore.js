import { observable, action, flow, toJS, computed } from "mobx"
import { createContext } from "react"
import { format } from "date-fns"
import api from "../api"

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
  // params for participant searching
  @observable params = {}
  // singular participant visit
  @observable visit = {}
  // flag for triggering route to Queue table once Participant Info has bee sent
  @observable routeToQueueTable = false
  @observable services = []
  @observable visitList = []
  // User search
  @observable errorState = false
  @observable errorMessage = ""

  // computed
  // if user has input a value for search, enable search else disable search
  @computed get toggleSearch() {
    // if the params obj has any new prop with a length > 0 and its ppId or fName or lName, then enable
    let hasSearchString =
      Object.keys(this.params).length > 0 &&
      (this.params.pp_id || this.params.first_name || this.params.last_name)
        ? true
        : false
    return !hasSearchString
  }
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
  // Full Participant and Visit Assignment Actions
  @action setParticipant = data => {
    this.participant = data
  }
  @action setVisit = data => {
    this.visit = data
  }
  // User Search Actions
  @action setUserIdParam = data => {
    this.params.pp_id = data.toUpperCase()
  }
  @action setFirstNameParam = data => {
    this.params.first_name = data
  }
  @action setLastNameParam = data => {
    this.params.last_name = data
  }
  @action setIdParam = data => {
    this.participant.id = data
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
  @action setFirstName = data => {
    this.participant.first_name = data
  }
  @action setLastName = data => {
    this.participant.last_name = data
  }
  @action setDateOfBirth = data => {
    this.participant.date_of_birth = data
  }
  @action setPPId = data => {
    this.participant.pp_id = data
  }
  @action setLastFourSSN = data => {
    this.participant.last_four_ssn = data
  }
  @action setRace = data => {
    this.participant.race = data
  }
  @action setGender = data => {
    this.participant.gender = data
  }
  @action setIsInsured = data => {
    this.participant.is_insured = data
  }
  @action setInsurer = data => {
    this.participant.insurer = data
  }
  @action setStartDate = () => {
    this.participant.start_date = format(new Date(), "yyyy-MM-dd")
  }
  // Visit State Actions
  @action setVisitProgram = data => {
    this.visit.program = data
  }
  @action setVisitService = data => {
    this.visit.service = data
  }
  @action setVisitUrgency = data => {
    this.visit.urgency = data
  }
  @action setVisitNotes = data => {
    this.visit.notes = data
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
  @action setErrorStateForUserSearch = state => {
    this.errorState = state
  }
  @action setErrorMessageForUserSearch = message => {
    this.errorMessage = message
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
      }
    } catch (error) {
      throw "ParticipantStore:  getPrograms() Failed  =>  " + error
    }
  })
  // called on  =>  ParticipantList.js
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
  // called on  =>  ParticipantInfo.js
  createParticipant = flow(function*() {
    try {
      const { ok, data } = yield api.createParticipant(toJS(this.participant))
      if (ok && data) {
        this.setParticipant(data)
        this.createVisit()
      }
    } catch (error) {
      throw "ParticipantStore:  createParticipant() Failed  =>  " + error
    }
  })
  createVisit = flow(function*() {
    try {
      this.setVisitParticipantId(this.participant.id)
      const { ok, data } = yield api.createVisits(toJS(this.visit))
      if (ok && data) {
        this.setVisit(data)
        this.getFrontEndDeskEvents()
      }
    } catch (error) {
      throw "ParticipantStore:  createVisit() Failed  =>  " + error
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
  getVisits = flow(function*() {
    try {
      const { ok, data } = yield api.getVisits()
      if (ok && data) {
        this.setVisitsList(data)
      }
    } catch (error) {
      throw "ParticipantStore:  getVisits() Failed  =>  " + error
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
      if (ok && data) {
        this.setParticipant(data)
      }
    } catch (error) {
      throw "ParticipantStore:  updateParticipant() Failed  =>  " + error
    }
  })
  // called on  =>  ParticipantInfo.js
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
}

export const ParticipantStoreContext = createContext(new ParticipantStore())
