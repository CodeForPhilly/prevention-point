import React from "react"
import PropTypes from "prop-types"
import { Route } from "react-router-dom"
import { observer } from "mobx-react-lite"
import MainLayout from "../layouts/MainLayout"

const PublicRoute = observer(({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ ...props }) => (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      )}
    />
  )
})

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

export default PublicRoute
