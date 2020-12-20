import { observable, action, flow, toJS, computed } from "mobx"
import { createContext } from "react"
import { format } from "date-fns"
import api from "../api"
import { handleSnackbarError } from "../error"

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
      sep_id: "",
      maiden_name: "",
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
    const { sep_id } = data
    this.participant = {
      ...data,
      // eslint-disable-next-line camelcase
      sep_id: sep_id ? sep_id.toString() : "",
    }
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
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.getInsurers()
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setInsurers(data)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  getPrograms = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.getPrograms()
      if (!ok || !data) {
        throw new Error(status)
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
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  getParticipant = flow(function*(participantId) {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.getParticipantById(participantId)
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setParticipant(data)
      // for redirect in exiting participant V
      this.rootStore.UtilityStore.setLoadingState(false)
      return ok
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
      this.rootStore.UtilityStore.setLoadingState(false)
      return false
    }
  })
  // called on  =>  ParticipantList.js
  getParticipants = flow(function*(params) {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.getParticipants(toJS(params))
      if (!ok || !data) {
        this.setParticipantsList([])
        throw new Error(status)
      }
      this.setParticipantsList(data)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  createParticipant = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    if (this.routeToQueueTable) {
      this.setRouteToQueue(false)
    }
    try {
      const { ok, data, status } = yield api.createParticipant(
        toJS(this.participant)
      )
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setParticipant(data)
      this.setRouteToQueue(true)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  createVisit = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      this.setVisitParticipantId(this.participant.id)
      const { ok, data, status } = yield api.createVisits(toJS(this.visit))
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setVisit(data)
      this.createNewFrontEndDeskEvents()
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  createNewFrontEndDeskEvents = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    if (this.routeToQueueTable) {
      this.setRouteToQueue(false)
    }
    try {
      const { ok, status } = yield api.postFrontDeskEvent({
        visit: this.visit.id,
        event_type: "ARRIVED",
      })
      if (!ok) {
        throw new Error(status)
      }
      this.setRouteToQueue(true)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  getVisits = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.getVisits()
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setVisitsList(data)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  // called on  =>  ParticipantInfo.js
  // only update basic facts about the participant
  updateParticipant = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.updateParticipant(
        toJS(this.participant.id),
        toJS(this.participant)
      )
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setParticipant(data)
      this.setIsEditing(false)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  // called on  =>  ParticipantInfo.js
  updateVisit = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    if (this.routeToQueueTable) {
      this.setRouteToQueue(false)
    }
    try {
      const { ok, status } = yield api.patchVisit(
        toJS(this.visit.id),
        toJS(this.visit)
      )
      if (!ok) {
        throw new Error(status)
      }
      this.setRouteToQueue(true)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  getSites = flow(function*() {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.getSites()
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setSites(data)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })
  createSEP = flow(function*({
    program,
    urgency,
    participant,
    needles_in,
    needles_out,
    visit_date,
    site,
    service,
  }) {
    this.rootStore.UtilityStore.setLoadingState(true)
    let success = false
    try {
      const {
        ok: visitOk,
        data: visitData,
        status: visitStatus,
      } = yield api.createVisits({
        program: program,
        urgency: urgency,
        participant: participant,
        service: service,
        visit_date: visit_date,
      })
      if (!visitOk || !visitData) {
        throw new Error(visitStatus)
      }
      const { ok, data, status } = yield api.createSEP({
        needles_in: needles_in,
        needles_out: needles_out,
        site: site,
        service: service,
        visit: visitData.id,
        visit_date: visit_date,
      })
      if (!ok || !data) {
        throw new Error(status)
      } else {
        success = true
      }
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
    return success
  })
}

export const ParticipantStoreContext = createContext(new ParticipantStore())
