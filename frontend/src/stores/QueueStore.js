import { observable, action, flow } from "mobx"
import { computed } from "mobx"
import { createContext } from "react"
import api from "../api"

export class QueueStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable queues = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  }

  queueIds = {
    TESTING: 1,
    CM: 2,
    SSHP: 3,
    LEGAL: 4,
    CRAFT: 5,
    PHAN: 6,
    STEP: 7,
    BIENSTAR: 8,
    SKWC: 9,
  }

  @computed get queueStats() {
    return {
      1: { name: "TESTING", length: this.queues[1].length, waitTime: "Dummy" },
      2: { name: "CM", length: this.queues[2].length, waitTime: "Dummy" },
      3: { name: "SSHP", length: this.queues[3].length, waitTime: "Dummy" },
      4: { name: "LEGAL", length: this.queues[4].length, waitTime: "Dummy" },
      5: { name: "CRAFT", length: this.queues[5].length, waitTime: "Dummy" },
      6: { name: "PHAN", length: this.queues[6].length, waitTime: "Dummy" },
      7: { name: "STEP", length: this.queues[7].length, waitTime: "Dummy" },
      8: { name: "BIENSTAR", length: this.queues[8].length, waitTime: "Dummy" },
      9: { name: "SKWC", length: this.queues[9].length, waitTime: "Dummy" },
    }
  }

  @action
  setQueue(queueIndex, data) {
    this.queues[queueIndex] = data
  }

  updateQueue = flow(function*(queueIndex) {
    const { ok, data } = yield api.getQueue(queueIndex)
    if (ok) {
      this.setQueue(queueIndex, data)
    } else {
      // TODO: Handle error
      //console.log("Error")
    }
  })
}

const queueStore = new QueueStore()
for (let i = 1; i < 10; i++) queueStore.updateQueue(i)

export const QueueStoreContext = createContext(queueStore)
//export const queueStore = new QueueStore()
