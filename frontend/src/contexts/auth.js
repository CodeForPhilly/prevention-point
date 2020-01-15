/* eslint-disable indent */
import React, { createContext, useContext, useReducer, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../api"

const AuthContext = createContext()

export function useContextAuth() {
  return useContext(AuthContext)
}
export const LOGIN = username => ({ type: "LOGIN", payload: { username } })
export const LOGOUT = () => ({ type: "LOGOUT" })
const initState = {
  username: "",
}
function AuthReducer(state, { type, payload }) {
  //console.log({ state, type, payload })
  switch (type) {
    case "LOGIN": {
      return payload
    }
    case "LOGOUT": {
      localStorage.removeItem("JWT_ACCESS")
      localStorage.removeItem("JWT_REFRESH")
      return initState
    }
    default: {
      throw new Error(`Invalid AuthStore type ${type}`)
    }
  }
}
export function AuthProvider({ children }) {
  const [auth, dispatchAuth] = useReducer(AuthReducer, initState)
  useEffect(() => {
    async function stillAuthenticated() {
      const verifyToken = await api.verifyToken()
      if (verifyToken.ok) {
        dispatchAuth(LOGIN("some username"))
      } else {
        dispatchAuth(LOGOUT())
      }
    }
    stillAuthenticated()
  }, [])
  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
