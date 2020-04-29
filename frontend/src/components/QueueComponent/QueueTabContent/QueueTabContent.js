import React, { useContext } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Typography, Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import TimelapseIcon from "@material-ui/icons/Timelapse"
import { QueueStoreContext } from "../../../stores/QueueStore"

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  queueTabStat: {
    margin: theme.typography.pxToRem(5),
    display: "inline-flex",
    alignItems: "flex-end",
  },
  queueTabStatValue: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightLight,
  },
  queueTabContent: {
    display: "flex",
  },
  queueTab: {
    flexGrow: 1,
  },
}))

//Forward ref used with MUI BaseButton. Does not allow observer.
const QueueTabContent = React.forwardRef(({ onClick, queueData }, _ref) => {
  const queueStore = useContext(QueueStoreContext)
  const classes = useStyles()

  return (
    <Button onClick={onClick} className={classes.queueTab}>
      <div>
        <Typography className={classes.heading}>
          {queueStore.queueStats[queueData].name}
        </Typography>
        <div className={classes.queueTabContent}>
          <div className={classes.queueTabStat}>
            <PersonIcon className={classes.queueTabIcon} />
            <Typography className={classes.queueTabStatValue}>
              {queueStore.queueStats[queueData].length}
            </Typography>
          </div>
          <div className={classes.queueTabStat}>
            <TimelapseIcon className={classes.queueTabIcon} />
            <Typography className={classes.queueTabStatValue}>
              {queueStore.queueStats[queueData].waitTime}
            </Typography>
          </div>
        </div>
      </div>
    </Button>
  )
})

QueueTabContent.displayName = "QueueTabContent"
QueueTabContent.propTypes = {
  onClick: PropTypes.func,
  queueData: PropTypes.number,
}

export default QueueTabContent
