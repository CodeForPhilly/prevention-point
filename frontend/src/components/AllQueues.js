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
import api from "../api"

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
  const queueSize = Object.keys(queueStore.queues).length
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0)
  const [isFrozen, setIsFrozen] = useState(false)
  function handleChange(event, newValue) {
    setTabValue(newValue)
  }

  const getProgram = async () => {
    let { data } = await api.getProgram(tabValue + 1)
    setIsFrozen(data.is_frozen)
  }

  const toggleFreeze = async () => {
    setIsFrozen(!isFrozen)
    await api.patchProgram(tabValue + 1, { is_frozen: !isFrozen })
  }

  //Update all queues on first rendering
  useEffect(() => {
    for (let i = 1; i <= queueSize; i++) queueStore.getQueue(i)
    getProgram()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Update queue of selected tab
  useEffect(() => {
    queueStore.getQueue(tabValue + 1)
    getProgram()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue])

  const tabArray = []
  for (let i = 1; i <= queueSize; i++) {
    tabArray.push(
      <QueueTab className={classes.queueTab} queueData={i} key={i} />
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {tabArray}
        </Tabs>
      </AppBar>
      <QueueTable queueData={tabValue + 1} />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" color="secondary" onClick={toggleFreeze}>
          {isFrozen ? "UnFreeze" : "Freeze"}
        </Button>
      </div>
    </div>
  )
})

AllQueues.propTypes = {
  queueData: PropTypes.string,
  classes: PropTypes.object,
}

export default AllQueues
