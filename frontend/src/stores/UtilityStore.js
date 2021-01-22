import { observable, action, flow } from "mobx"
import { createContext } from "react"
import { SEARCH, SNACKBAR_SEVERITY } from "../constants"
import { handleSnackbarError } from "../error"
import api from "../api"

export class UtilityStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // snackbar notifications
  @observable snackbarState = {
    message: "",
    severity: SNACKBAR_SEVERITY.INFO,
    open: false,
  }
  @observable loadingState = false
  // participant search
  @observable sidebarView = SEARCH
  @observable isDrawerOpen = false
  @observable SEPFormValues = {
    last_name: "",
    date_of_birth: "",
    maiden_name: "",
    sep_id: "",
  }
  @observable serviceSlugResponse = {}

  // Drawer
  @action handleDrawerOpen = () => {
    this.isDrawerOpen = true
  }
  @action handleDrawerClose = () => {
    this.isDrawerOpen = false
  }
  // Sidebar
  @action setSidebarView = sidebarView => {
    this.sidebarView = sidebarView
  }

  @action setSnackbarState = (message, options = {}) => {
    const severity = options.severity
      ? options.severity
      : SNACKBAR_SEVERITY.INFO
    const open = options.open === undefined ? true : options.open
    // prevent visual change to severity or message when closing the snackbar
    if (open) {
      this.snackbarState.severity = severity
      this.snackbarState.message = message
    }
    this.snackbarState.open = open
  }

  @action setLoadingState = isLoading => {
    this.loadingState = isLoading
  }

  @action setSEPFormValues = participant => {
    this.SEPFormValues = {
      last_name: participant.last_name,
      date_of_birth: participant.date_of_birth,
      maiden_name: participant.maiden_name,
      sep_id: participant.sep_id,
      participant_id: participant.id,
    }
  }

  @action clearSEPFormValues = () => {
    this.SEPFormValues = {
      last_name: "",
      date_of_birth: "",
      maiden_name: "",
      sep_id: "",
    }
  }

  @action setServiceSlugResponse = service => {
    this.serviceSlugResponse = service
  }

  getServiceBySlug = flow(function*(slug) {
    try {
      const { ok, data, status } = yield api.getServiceBySlug(slug)
      if (!ok || !data) {
        throw new Error(status)
      }

      const [service] = data
      this.setServiceSlugResponse(service)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
  })
}

export const UtilityStoreContext = createContext(new UtilityStore())
