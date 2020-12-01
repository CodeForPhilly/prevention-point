import { observable, action, flow } from "mobx"
import { createContext } from "react"
import api from "../api"
import { handleError } from "../error"

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
    document.cookie = "JWT_ACCESS=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    document.cookie = "JWT_REFRESH=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    this.isAuthenticated = false
    this.username = null
    this.email = null
  }

  login = flow(function*(username, password) {
    try {
      const { ok, data, status } = yield api.createToken(username, password)
      if (!ok) {
        throw new Error(status)
      }
      this.setIsAuthenticated(true)
      this.setUsername(data.username)
      this.setEmail(data.email)
      this.setError(data.null)
    } catch (error) {
      const errorMessage = handleError(error.message)
      throw errorMessage
    }
  })
}

export const AuthStoreContext = createContext(new AuthStore())
