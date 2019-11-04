import React, { useState, useContext } from "react"
import PropTypes, { oneOfType, string, number } from "prop-types"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { QueueStoreContext } from "../stores/QueueStore"

const QueueTableDropdown = props => {
  const queueStore = useContext(QueueStoreContext)
  const [value, setValue] = useState(props.initialValue)
  function handleChange(event) {
    setValue(event.target.value)
    const data = {
      [props.column]: event.target.value,
    }
    //console.log("QueueTableDropDown: ", props.queueData, props.id, props.column, value, data)
    queueStore.patchVisit(props.queueData, props.id, data)
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
  queueData: PropTypes.number,
  id: PropTypes.number,
  column: PropTypes.string,
}

export default QueueTableDropdown
