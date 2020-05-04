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
  // disabled and large are booleans. can add a class where button is imported
  const classes = useStyles()
  const { type, children, disabled, large, color, onClick, className } = props

  return (
    <Button
      color={color}
      variant="contained"
      disabled={disabled}
      className={clsx(classes.PrevPointButton, className)}
      size={large ? "large" : "small"}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

PrevPointButton.propTypes = {
  large: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.array,
  ]),
  className: PropTypes.string,
}

PrevPointButton.defaultProps = {
  large: false,
  type: "button",
  disabled: false,
  color: "primary",
  onClick: () => {},
}

export default PrevPointButton
