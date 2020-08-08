import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { rootStoreContext } from "../stores/RootStore"
import MainLayout from "../layouts/MainLayout"

// to use programmatic layouts, give this custom route component a 'layout' prop,
// and pass the layout like we are passing 'component'

const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const rootStore = useContext(rootStoreContext)
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        rootStore.authStore.isAuthenticated ? (
          <MainLayout>
            <Component {...props} />
          </MainLayout>
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
