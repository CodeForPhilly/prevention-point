import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useContextAuth } from "../contexts/auth"

const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const {
    auth: { username },
  } = useContextAuth()
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        username ? (
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
})

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

export default PrivateRoute
