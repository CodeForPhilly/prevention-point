import { createContext } from "react"
import { AuthStore } from "./AuthStore"
import { ParticipantStore } from "./ParticipantStore"
import { QueueStore } from "./QueueStore"

export class RootStore {
  // If creating a new store dont forget to add it here.
  authStore = new AuthStore(this)
  ParticipantStore = new ParticipantStore(this)
  QueueStore = new QueueStore(this)
}

export const rootStoreContext = createContext(new RootStore())
