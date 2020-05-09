import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Typography, Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import TimelapseIcon from "@material-ui/icons/Timelapse"

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
const QueueTabContent = React.forwardRef(
  ({ onClick, name, length, waitTime }, _ref) => {
    const classes = useStyles()

    return (
      <Button onClick={onClick} className={classes.queueTab} ref={_ref}>
        <div>
          <Typography className={classes.heading}>{name}</Typography>
          <div className={classes.queueTabContent}>
            <div className={classes.queueTabStat}>
              <PersonIcon className={classes.queueTabIcon} />
              <Typography className={classes.queueTabStatValue}>
                {length}
              </Typography>
            </div>
            <div className={classes.queueTabStat}>
              <TimelapseIcon className={classes.queueTabIcon} />
              <Typography className={classes.queueTabStatValue}>
                {waitTime}
              </Typography>
            </div>
          </div>
        </div>
      </Button>
    )
  }
)

QueueTabContent.displayName = "QueueTabContent"
QueueTabContent.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  length: PropTypes.number,
  waitTime: PropTypes.number,
}

export default QueueTabContent
