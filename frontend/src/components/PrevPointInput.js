// TODO:
/**
 * 1. Breakup into participant and visit child components
 * 2. Break fields into smaller individual components for re-use in other forms
 * 3. Break up state in MobX for field re-use
 */

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
