import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { rootStoreContext } from "../stores/RootStore"

const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const rootStore = useContext(rootStoreContext)
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        rootStore.authStore.isAuthenticated ? (
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
  component: PropTypes.func,
}

export default PrivateRoute
