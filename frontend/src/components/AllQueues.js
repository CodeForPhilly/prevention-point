import React from "react"
import PropTypes from "prop-types"
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  withStyles,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
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
  return (
    <div className={classes.root}>
      {queueData.map(queue => (
        <ExpansionPanel key={queue.id}>
          <ExpansionPanelSummary
            className={classes.panelSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>
              {queue.name}{" "}
              <span className={classes.waitTime}>
                Wait time: {queue.waitTime}
              </span>
            </Typography>{" "}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <QueueTable rows={queue.rows} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  )
}

AllQueues.propTypes = {
  queueData: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(AllQueues)
