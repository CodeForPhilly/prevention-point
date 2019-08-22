import React, { useState } from "react"
import PropTypes from "prop-types"
import QueueTable from "./QueueTable"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import "../scss/participant-search.scss"

const styles = theme => ({
  root: {
    width: "auto",
    textAlign: "right",
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
  <Grid
    style={{
      display: "flex-column",
    }}
  >
    <Typography
      variant="button"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontWeight: 900,
      }}
    >
      {name}
    </Typography>
    <Typography
      variant="caption"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        fontWeight: 450,
      }}
    >
      {`Wait Time: ${waitTime}`}
    </Typography>
  </Grid>
)

function AllQueues({ queueData, classes }) {
  const [value, setValue] = useState(queueData[0]["id"])
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <Grid>
      <div className={classes.root}>
        <div>
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
      </div>
    </Grid>
  )
}

AllQueues.propTypes = {
  queueData: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(AllQueues)
