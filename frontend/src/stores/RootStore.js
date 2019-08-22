import { createContext } from "react"
import { AuthStore } from "./AuthStore"
import { participantStore } from "./ParticipantStore"
import { QueueStore } from "./QueueStore"

export class RootStore {
  // If creating a new store dont forget to add it here.
  authStore = new AuthStore(this)
  participantStore = participantStore
  QueueStore = new QueueStore(this)
}

export const rootStoreContext = createContext(new RootStore())
