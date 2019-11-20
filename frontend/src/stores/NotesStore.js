import { observable, action, flow } from "mobx"
import { createContext } from "react"
import api from "../api"

export class NotesStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable notesList = null

  @action
  setNotesList(note) {
    this.notesList = this.notesList.push(note)
  }

  visitsList = flow(function*(req) {
    try {
      const { ok, data } = yield api.getVisits(req)
      if (ok) {
        this.setNotesList(data)
      }
    } catch (error) {
      // TODO: Handle errors
    }
  })
}

export const NotesStoreContext = createContext(new NotesStore())
