import { createContext } from "react"
import { AuthStore } from "./AuthStore"
import { participantStore } from "./ParticipantStore"

export class RootStore {
  // If creating a new store dont forget to add it here.
  authStore = new AuthStore(this)
  participantStore = participantStore
}

export const rootStoreContext = createContext(new RootStore())
