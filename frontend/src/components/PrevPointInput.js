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

const PrevPointInput = props => {
  return (
    <Input
      id={props.id}
      name={props.name}
      value={props.val}
      onChange={e => {
        props.changeFunc(e.target.value)(props && props.changeFunc2)
          ? props.changeFunc2(e.target.value)
          : null
      }}
      required
    />
  )
}

PrevPointInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  val: PropTypes.any,
  changeFunc: PropTypes.func,
  changeFunc2: PropTypes.func,
}

export default PrevPointInput
