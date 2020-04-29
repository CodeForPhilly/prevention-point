import { observable, action, flow } from "mobx"
import { computed } from "mobx"
import { createContext } from "react"
import moment from "moment"
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
  // TODO: refactor after v1.0.0 release
  @observable participantWithPrograms = []
  @observable participantNotes = ""

  //Set tab order here
  @computed get queueStats() {
    return {
      1: {
        name: "TESTING",
        length: this.queues[1].length,
        waitTime: this.longestWait(this.queues[1]),
      },
      2: {
        name: "CM",
        length: this.queues[2].length,
        waitTime: this.longestWait(this.queues[2]),
      },
      3: {
        name: "SSHP",
        length: this.queues[3].length,
        waitTime: this.longestWait(this.queues[3]),
      },
      4: {
        name: "LEGAL",
        length: this.queues[4].length,
        waitTime: this.longestWait(this.queues[4]),
      },
      5: {
        name: "CRAFT",
        length: this.queues[5].length,
        waitTime: this.longestWait(this.queues[5]),
      },
      6: {
        name: "PHAN",
        length: this.queues[6].length,
        waitTime: this.longestWait(this.queues[6]),
      },
      7: {
        name: "STEP",
        length: this.queues[7].length,
        waitTime: this.longestWait(this.queues[7]),
      },
      8: {
        name: "BIENSTAR",
        length: this.queues[8].length,
        waitTime: this.longestWait(this.queues[8]),
      },
      9: {
        name: "SKWC",
        length: this.queues[9].length,
        waitTime: this.longestWait(this.queues[9]),
      },
    }
  }

  @action
  setQueue(queueIndex, data) {
    this.queues[queueIndex] = data.sort((a, b) => +b.urgency[1] - +a.urgency[1])
    // TODO: refactor after v1.0.0 release
    this.participantWithPrograms = [
      ...this.participantWithPrograms,
      ...data.map(queueItem => {
        return {
          id: queueItem.participant.id,
          programs: { id: queueItem.program.id, name: queueItem.program.name },
        }
      }),
    ]
  }
  @action
  setParticipantNotes = notes => {
    this.participantNotes = notes
  }

  //Return the longest wait time in minutes
  longestWait(queue) {
    if (queue && queue.length > 0) {
      return Math.floor(
        (moment() - Math.min(...queue.map(x => moment(x.status.created_at)))) /
          60000
      )
    } else {
      return 0
    }
  }

  getQueue = flow(function*(queueIndex) {
    try {
      const { ok, data } = yield api.getQueue(queueIndex)
      if (ok) {
        this.setQueue(queueIndex, data)
      }
    } catch (error) {
      throw "QueueStore:  getQueue() Failed  =>  " + error
    }
  })

  patchVisit = flow(function*(queueIndex, visitIndex, data) {
    try {
      const { ok } = yield api.patchVisit(visitIndex, data)
      if (ok) {
        this.getQueue(queueIndex)
      }
    } catch (error) {
      throw "QueueStore:  patchVisit() Failed  =>  " + error
    }
  })

  updateStatus = flow(function*(queueIndex, visitIndex, eventType) {
    try {
      const body = {
        visit: visitIndex,
        event_type: eventType,
      }
      const { ok } = yield api.postFrontDeskEvent(body)
      if (ok) {
        this.getQueue(queueIndex)
      }
    } catch (error) {
      throw "QueueStore:  updateStatus() Failed  =>  " + error
    }
  })

  getNotes(queueIndex, visitIndex) {
    const array = this.queues[queueIndex].filter(x => x.id === visitIndex)
    if (array.length === 1) {
      return array[0].notes
    }
    return ""
  }
}

export const QueueStoreContext = createContext(new QueueStore())
