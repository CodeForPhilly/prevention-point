import { observable, action, flow } from "mobx"
import { createContext } from "react"
import api from "../api"

export class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable isAuthenticated = null
  @observable username = null
  @observable email = null

  @action
  setIsAuthenticated(auth) {
    this.isAuthenticated = auth
  }
  @action
  setUsername(username) {
    this.username = username
  }
  @action
  setEmail(email) {
    this.username = email
  }

  login = flow(function*(username, password) {
    try {
      const { ok, data } = yield api.createToken(username, password)
      if (ok) {
        this.setIsAuthenticated(true)
        this.setUsername(data.username)
        this.setEmail(data.email)
      }
    } catch (error) {
      // TODO: Handle errors
    }
  })

  @action
  logout() {
    localStorage.removeItem("JWT_ACCESS")
    localStorage.removeItem("JWT_REFRESH")
    this.isAuthenticated = false
    this.username = null
    this.email = null
  }
}

export const AuthStoreContext = createContext(new AuthStore())
