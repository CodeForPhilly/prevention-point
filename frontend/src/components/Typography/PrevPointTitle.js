import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const PrevPointTitle = props => {
  const { children } = props

  return (
    <Typography display="block" component="p" variant="subtitle1">
      {children}
    </Typography>
  )
}

PrevPointTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.array,
  ]),
}

PrevPointTitle.defaultProps = {}

export default PrevPointTitle
