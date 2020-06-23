import { observable, action, flow } from "mobx"
import { createContext } from "react"
import moment from "moment"
import api from "../api"

export class QueueStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable queues = []

  // TODO: refactor after v1.0.0 release
  @observable participantWithPrograms = []
  @observable participantNotes = ""

  @action
  setQueues(programs) {
    this.queues = programs
  }

  @action
  setQueue(id, data) {
    let program = this.queues.find(item => item.id === id)
    program.participants = [...data].sort((a, b) => {
      return +b.urgency - +a.urgency
    })
    program.waitTime = this.longestWait(data)
    program.length = data.length

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

  getQueue = flow(function*(programId) {
    // takes programId, not queueIndex
    try {
      const { ok, data } = yield api.getQueue(programId)
      if (ok) {
        this.setQueue(programId, data)
      }
    } catch (error) {
      throw "QueueStore:  getQueue() Failed  =>  " + error
    }
  })

  patchVisit = flow(function*(queueIndex, visitIndex, data) {
    try {
      const { ok } = yield api.patchVisit(visitIndex, data)
      if (ok) {
        const programId = this.queues[queueIndex].id
        this.getQueue(programId)
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
        const programId = this.queues[queueIndex].id
        this.getQueue(programId)
      }
    } catch (error) {
      throw "QueueStore:  updateStatus() Failed  =>  " + error
    }
  })

  getNotes(queueIndex, visitId) {
    const array = this.queues[queueIndex].participants.filter(
      x => x.id === visitId
    )
    if (array.length === 1) {
      return array[0].notes
    }
    return ""
  }
}

export const QueueStoreContext = createContext(new QueueStore())
