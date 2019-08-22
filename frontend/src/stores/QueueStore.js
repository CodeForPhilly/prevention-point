import { observable, action, flow } from "mobx"
//import { createContext } from "react"
import api from "../api"

export class QueueStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  queueIds = {
    stepQueue: 1,
    legalServiceQueue: 2,
    needleExchangeQueue: 3,
  }

  @observable stepQueue = []
  @observable legalServiceQueue = []
  @observable needleExchangeQueue = []

  @action
  setQueue(queue, data) {
    queue = data
  }

  updateQueue = flow(function*(queue) {
    const { ok, data } = yield api.getQueue(this.queueIds["queue"])
    if (ok) {
      this.setQueue(queue, data)
    } else {
      // TODO: Handle errors
    }
  })
}
//export const QueueStoreContext = createContext(new QueueStore())
export const queueStore = new QueueStore()
