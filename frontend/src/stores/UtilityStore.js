import { observable, action } from "mobx"
import { createContext } from "react"
import { SEARCH } from "../constants"

export class UtilityStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // snackbar notifications
  @observable snackbarState = { message: "", open: false }
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

  @action setSnackbarState = (message, options = { open: true }) => {
    // we setup otions like this to maybe add more later
    this.snackbarState.message = message
    this.snackbarState.open = options.open
  }
}

export const UtilityStoreContext = createContext(new UtilityStore())
