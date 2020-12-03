import { observable, action } from "mobx"
import { createContext } from "react"
import { SEARCH, SNACKBAR_SEVERITY } from "../constants"

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
  // participant search
  @observable sidebarView = SEARCH
  @observable isDrawerOpen = false
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
}

export const UtilityStoreContext = createContext(new UtilityStore())
