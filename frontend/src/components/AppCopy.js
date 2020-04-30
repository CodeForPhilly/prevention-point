import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const AppCopy = props => {
  // Theme styling applied with createMuiTheme.
  // can add modifiers with a class selector, for things like margin or color

  const { children, className } = props

  return (
    <Typography
      display="block"
      component="p"
      variant="body1"
      className={className}
    >
      {children}
    </Typography>
  )
}

AppCopy.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.array,
  ]),
  className: PropTypes.string,
}

export default AppCopy
