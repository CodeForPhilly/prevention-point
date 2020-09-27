import React, { useContext } from "react"
import PropTypes, { oneOfType, string, number } from "prop-types"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { QueueStoreContext } from "../../../../stores/QueueStore"

const QueueTableDropdown = props => {
  const queueStore = useContext(QueueStoreContext)
  let value = props.initialValue
  const col = props.column

  const handleChange = e => {
    value = e.target.value
    if (col === "urgency") {
      queueStore.patchVisit(props.queueData, props.id, {
        [col]: e.target.value,
      })
    }
    if (col === "status") {
      queueStore.updateStatus(props.queueData, props.id, e.target.value)
    }
  }
  return (
    <Select value={value} onChange={handleChange} fullWidth>
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
