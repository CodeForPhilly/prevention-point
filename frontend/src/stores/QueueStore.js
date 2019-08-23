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

  // Hack ???
  @action
  setQueue(queue, data) {
    //queue = data
    if (queue === "1") {
      this.stepQueue = data
      //console.log(queue, data, this.stepQueue)
    } else if (queue === "2") {
      this.legalServiceQueue = data
      //console.log(queue, data, this.legalServiceQueue)
    } else if (queue === "3") {
      this.needleExchangeQueue = data
      //console.log(queue, data, this.needlwQueue)
    } else {
      //console.log("setQueue error")
    }
  }

  updateQueue = flow(function*(queue) {
    const { ok, data } = yield api.getQueue(queue)
    if (ok) {
      this.setQueue(queue, data)
    } else {
      // TODO: Handle error
      //console.log("Error")
    }
  })
}
//export const QueueStoreContext = createContext(new QueueStore())
export const queueStore = new QueueStore()
