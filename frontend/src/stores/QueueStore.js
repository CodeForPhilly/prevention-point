import { observable, action, flow } from "mobx"
import { createContext } from "react"
import moment from "moment"
import api from "../api"
import { handleSnackbarError } from "../error"

export class QueueStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable queues = []

  // TODO: refactor after v1.0.0 release
  @observable participantNotes = ""

  @action
  setQueues(programs) {
    this.queues = programs
  }

  @action
  setQueue(id, data) {
    let program = this.queues.find(item => item.id === id)
    program.visits = [...data].sort((a, b) => {
      return +b.urgency - +a.urgency
    })
    program.waitTime = this.longestWait(data)
    program.length = data.length
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
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, data, status } = yield api.getQueue(programId)
      if (!ok || !data) {
        throw new Error(status)
      }
      this.setQueue(programId, data)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })

  patchVisit = flow(function*(queueIndex, visitIndex, data) {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const { ok, status } = yield api.patchVisit(visitIndex, data)
      if (!ok) {
        throw new Error(status)
      }
      const programId = this.queues[queueIndex].id
      this.getQueue(programId)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })

  updateStatus = flow(function*(queueIndex, visitIndex, eventType) {
    this.rootStore.UtilityStore.setLoadingState(true)
    try {
      const body = {
        visit: visitIndex,
        event_type: eventType,
      }
      const { ok, status } = yield api.postFrontDeskEvent(body)
      if (!ok) {
        throw new Error(status)
      }
      const programId = this.queues[queueIndex].id
      this.getQueue(programId)
    } catch (error) {
      const snackbarError = handleSnackbarError(error.message)
      this.rootStore.UtilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
    }
    this.rootStore.UtilityStore.setLoadingState(false)
  })

  getNotes(queueIndex, visitId) {
    const array = this.queues[queueIndex].visits.filter(x => x.id === visitId)
    if (array.length === 1) {
      return array[0].notes
    }
    return ""
  }
}

export const QueueStoreContext = createContext(new QueueStore())
