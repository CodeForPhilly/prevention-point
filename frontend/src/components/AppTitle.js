import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const AppTitle = props => {
  const { children } = props

  return (
    <Typography display="block" component="p" variant="subtitle1">
      {children}
    </Typography>
  )
}

AppTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.array,
  ]),
}

AppTitle.defaultProps = {}

export default AppTitle
