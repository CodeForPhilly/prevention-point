import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const PrevPointHeading = props => {
  // Theme styling applied with createMuiTheme.
  // can add modifiers with a class selector, for things like margin or color
  const { children, className } = props

  return (
    <Typography
      aria-label="heading"
      display="block"
      component="h2"
      variant="h2"
      className={className}
    >
      {children}
    </Typography>
  )
}

PrevPointHeading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default PrevPointHeading
