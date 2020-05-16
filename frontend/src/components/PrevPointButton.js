import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import clsx from "clsx"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(() => ({
  PrevPointButton: {
    marginTop: 20,
  },
}))

const PrevPointButton = props => {
  // can add a class where button is imported
  const classes = useStyles()
  const { children, className } = props

  return (
    <Button
      {...props}
      className={clsx(classes.PrevPointButton, className)}
      variant="contained"
    >
      {children}
    </Button>
  )
}

PrevPointButton.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

PrevPointButton.defaultProps = {
  size: "small",
  type: "button",
  disabled: false,
  color: "primary",
  onClick: () => {},
}

export default PrevPointButton
