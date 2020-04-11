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
  @observable error = null

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
  @action
  setError(error) {
    this.error = error
  }
  @action
  logout() {
    localStorage.removeItem("JWT_ACCESS")
    localStorage.removeItem("JWT_REFRESH")
    this.isAuthenticated = false
    this.username = null
    this.email = null
  }

  login = flow(function*(username, password) {
    try {
      const { ok, data } = yield api.createToken(username, password)
      if (ok) {
        this.setIsAuthenticated(true)
        this.setUsername(data.username)
        this.setEmail(data.email)
        this.setError(data.null)
      } else {
        throw new Error()
      }
    } catch (error) {
      this.setError(true)
    }
  })
}

export const AuthStoreContext = createContext(new AuthStore())
