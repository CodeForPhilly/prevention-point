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

  //@computed get mapQueueToData(queue) {
  mapQueueToData(queue) {
    const data = []
    if (queue) {
      queue.forEach(element => {
        const row = [
          1,
          element.participant.last_name,
          element.participant.pp_id,
          element.status.created_at,
          element.status.event_type,
          false,
        ]
        data.append(row)
      })
    }
    const result = {
      id: "Dummy",
      name: "Dummy",
      waitTime: "Dummy",
      length: data.length,
      rows: data,
    }
    return result
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
export const QueueStoreContext = createContext(new QueueStore())
//export const queueStore = new QueueStore()
