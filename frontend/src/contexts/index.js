import React from "react"
import PropTypes from "prop-types"
import { AuthProvider } from "./auth"

export default function IndexProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

IndexProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
