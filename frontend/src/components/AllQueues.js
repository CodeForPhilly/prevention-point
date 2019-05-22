import React, { useState } from "react"
import PropTypes from "prop-types"
import QueueTable from "./QueueTable"

import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

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

const queueTabText = (name, waitTime) => (
  <div>
    <Typography variant="button">{name}</Typography>
    <Typography variant="caption">{`Wait Time: ${waitTime}`}</Typography>
  </div>
)

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
            label={queueTabText(queue.name, queue.waitTime)}
          />
        ))}
      </Tabs>
      {queueData.map(
        queue =>
          queue.id === value && (
            <QueueTable
              key={queue.id}
              rows={queue.rows}
              queueName={queue.name}
            />
          )
      )}
    </div>
  )
}

AllQueues.propTypes = {
  queueData: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(AllQueues)
