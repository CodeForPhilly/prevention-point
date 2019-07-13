import { createContext } from "react"
import { AuthStore } from "./AuthStore"
import { QueueStore } from "./QueueStore"

export class RootStore {
  authStore = new AuthStore(this)
  QueueStore = new QueueStore(this)
}

export const rootStoreContext = createContext(new RootStore())
