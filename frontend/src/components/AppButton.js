import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import clsx from "clsx"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(() => ({
  appButton: {
    marginTop: 20,
  },
}))

const AppButton = props => {
  // submit, disabled, and large a booleans. can add a class where button is imported
  const classes = useStyles()
  const { submit, children, disabled, large, color, onClick, className } = props

  return (
    <Button
      color={color}
      variant="contained"
      disabled={disabled}
      className={clsx(classes.appButton, className)}
      size={large ? "large" : "small"}
      type={submit ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

AppButton.propTypes = {
  submit: PropTypes.bool,
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

AppButton.defaultProps = {
  large: false,
  submit: false,
  disabled: false,
  color: "primary",
  onClick: () => {},
}

export default AppButton
