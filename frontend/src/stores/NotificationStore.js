import { observable, action } from "mobx"
import { createContext } from "react"

export class NotificationStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // snackbar notifications
  @observable snackbarState = { message: "", open: false }

  @action setSnackbarState = (message, options = { open: true }) => {
    // we setup otions like this to maybe add more later
    this.snackbarState.message = message
    this.snackbarState.open = options.open
  }
}

export const NotificationStoreContext = createContext(new NotificationStore())
