import React, { useState } from "react"
import PropTypes, { oneOfType, string, number } from "prop-types"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const QueueTableDropdown = props => {
  const [value, setValue] = useState(props.initialValue)
  function handleChange(event) {
    setValue(event.target.value)
  }
  return (
    <Select value={value} onChange={handleChange}>
      {props.items.map((item, idx) => (
        <MenuItem key={idx} value={item.value}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  )
}

QueueTableDropdown.displayName = "QueueTableDropdown"

QueueTableDropdown.propTypes = {
  initialValue: oneOfType([string, number]),
  items: PropTypes.array.isRequired,
}

export default QueueTableDropdown
