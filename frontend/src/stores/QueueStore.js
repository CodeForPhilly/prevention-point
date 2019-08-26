import { observable, action, flow } from "mobx"
import { computed } from "mobx"
import { createContext } from "react"
import api from "../api"

export class QueueStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  queueIds = {
    stepQueue: 1,
    legalServiceQueue: 2,
    caseQueue: 3,
  }

  @observable stepQueue = []
  @observable legalServiceQueue = []
  @observable caseQueue = []

  mapQueueToData(queue) {
    if (queue) {
      return {
        id: "Dummy",
        name: "Dummy",
        waitTime: "Dummy",
        length: queue.length,
        rows: [],
        //rows: queue.map(x => {1, x.participant.last_name, x.participant.pp_id, x.status.created_at, x.status.event_type, false}),
      }
    }
    return {
      id: "Dummy",
      name: "Dummy",
      waitTime: "Dummy",
      length: 0,
      rows: [],
    }
  }

  @computed get mapStepQueue() {
    return this.mapQueueToData(this.stepQueue)
  }

  @computed get mapLegalQueue() {
    return this.mapQueueToData(this.legalServiceQueue)
  }

  @computed get mapCaseQueue() {
    return this.mapQueueToData(this.caseQueue)
  }

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
      this.caseQueue = data
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
const queueStore = new QueueStore()
queueStore.updateQueue("1")
queueStore.updateQueue("2")
queueStore.updateQueue("3")

export const QueueStoreContext = createContext(queueStore)
//export const queueStore = new QueueStore()
