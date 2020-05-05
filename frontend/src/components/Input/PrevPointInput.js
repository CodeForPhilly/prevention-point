/* eslint-disable indent */
import React from "react"
import PropTypes from "prop-types"
import Input from "@material-ui/core/Input"

const PrevPointInput = props => <Input {...props} />

PrevPointInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
}

export default PrevPointInput
