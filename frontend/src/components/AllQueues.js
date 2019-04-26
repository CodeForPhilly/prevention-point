import React, { useState } from "react"
import PropTypes from "prop-types"
import { Tabs, Tab, withStyles } from "@material-ui/core"
import QueueTable from "./QueueTable"
import _ from "lodash"

const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  waitTime: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightLight,
  },
})

function AllQueues({ queueData, classes }) {
  const [value, setValue] = useState(queueData[0]["id"])
  const [rows, setRows] = useState(queueData[0]["rows"])
  function handleChange(event, newValue) {
    setValue(newValue)
    setRows(_.find(queueData, ["id", newValue])["rows"])
  }

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        {queueData.map(queue => (
          <Tab
            key={queue.id}
            value={queue.id}
            label={`${queue.name} Wait Time: ${queue.waitTime}`}
          />
        ))}
      </Tabs>
      <QueueTable rows={rows} />
    </div>
  )
}

AllQueues.propTypes = {
  queueData: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(AllQueues)
