import { createContext } from "react"
import { AuthStore } from "./AuthStore"

export class RootStore {
  authStore = new AuthStore(this)
}

export const rootStoreContext = createContext(new RootStore())
