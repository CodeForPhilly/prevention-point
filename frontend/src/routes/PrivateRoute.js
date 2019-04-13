import React from "react"
import PropTypes from "prop-types"
import fakeAuth from "../auth"
import { Route, Redirect } from "react-router-dom"

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
}

export default PrivateRoute
