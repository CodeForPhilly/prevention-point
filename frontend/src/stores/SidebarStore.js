import { observable, decorate } from "mobx"
import { createContext } from "react"

export class SidebarStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  sidebarState = false

  drawerWidth = 400
}

decorate(SidebarStore, {
  sidebarState: observable,
  drawerWidth: observable,
})

export const SidebarStoreContext = createContext(new SidebarStore())
