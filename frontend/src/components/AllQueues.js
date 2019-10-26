import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Tabs, Tab, Typography, Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import TimelapseIcon from "@material-ui/icons/Timelapse"
import AppBar from "@material-ui/core/AppBar"
import { QueueStoreContext } from "../stores/QueueStore"
import QueueTable from "./QueueTable"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
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

  // Add state update functionality

  // Add pinging for checking if queues have updated / websockets?

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

function QueueTab(props) {
  return (
    <Tab
      component={QueueTabContent}
      onClick={event => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

const AllQueues = observer(() => {
  const queueStore = useContext(QueueStoreContext)
  const queueSize = Object.keys(queueStore.queueIds).length

  useEffect(() => {
    for (let i = 1; i <= queueSize; i++) queueStore.updateQueue(i)
  })
  const classes = useStyles()
  const [value, setValue] = useState(0)
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["TESTING"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["CM"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["SSHP"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["LEGAL"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["CRAFT"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["PHAN"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["STEP"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["BIENSTAR"]}
          />
          <QueueTab
            className={classes.queueTab}
            queueData={queueStore.queueIds["SKWC"]}
          />
        </Tabs>
      </AppBar>
      {value === 0 && <QueueTable queueData={queueStore.queueIds["TESTING"]} />}
      {value === 1 && <QueueTable queueData={queueStore.queueIds["CM"]} />}
      {value === 2 && <QueueTable queueData={queueStore.queueIds["SSHP"]} />}
      {value === 3 && <QueueTable queueData={queueStore.queueIds["LEGAL"]} />}
      {value === 4 && <QueueTable queueData={queueStore.queueIds["CRAFT"]} />}
      {value === 5 && <QueueTable queueData={queueStore.queueIds["PHAN"]} />}
      {value === 6 && <QueueTable queueData={queueStore.queueIds["STEP"]} />}
      {value === 7 && (
        <QueueTable queueData={queueStore.queueIds["BIENSTAR"]} />
      )}
      {value === 8 && <QueueTable queueData={queueStore.queueIds["SKWC"]} />}
    </div>
  )
})

AllQueues.propTypes = {
  queueData: PropTypes.string,
  classes: PropTypes.object,
}

export default AllQueues
