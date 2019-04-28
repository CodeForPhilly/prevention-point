import React, { useState } from "react"
import PropTypes from "prop-types"
import { Tabs, Tab, withStyles } from "@material-ui/core"
import QueueTable from "./QueueTable"

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
  function handleChange(event, newValue) {
    setValue(newValue)
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
      {queueData.map(
        queue =>
          queue.id === value && <QueueTable key={queue.id} rows={queue.rows} />
      )}
    </div>
  )
}

AllQueues.propTypes = {
  queueData: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(AllQueues)
