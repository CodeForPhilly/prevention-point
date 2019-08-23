import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Tabs, Tab, Typography, Button } from "@material-ui/core"
import QueueTable from "./QueueTable"
import PersonIcon from "@material-ui/icons/Person"
import TimelapseIcon from "@material-ui/icons/Timelapse"
import {
  caseManagementQueueData,
  legalServicesQueueData,
  stepQueueData,
} from "../../fixtures/MockQueueData"

import { queueStore } from "../stores/QueueStore"

//Mismatch with fake data ???
//console.log(queueStore)
queueStore.updateQueue("1")
queueStore.updateQueue("2")
queueStore.updateQueue("3")

//These do not match ???
//Pull in data from backend
const caseQueue = queueStore.needleExchangeQueue
const legalQueue = queueStore.legalServicesQueue
const stepQueue = queueStore.stepQueue

//Put data into rows of queue data. Massage this!
caseManagementQueueData.rows = caseQueue
legalServicesQueueData.rows = legalQueue
stepQueueData.rows = stepQueue

const useStyles = makeStyles(theme => ({
  root: {
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

const QueueTabContent = React.forwardRef(({ onClick, queueData }, _ref) => {
  const classes = useStyles()
  return (
    <Button onClick={onClick} className={classes.queueTab}>
      <div>
        <Typography className={classes.heading}>{queueData.name}</Typography>
        <div className={classes.queueTabContent}>
          <div className={classes.queueTabStat}>
            <PersonIcon className={classes.queueTabIcon} />
            <Typography className={classes.queueTabStatValue}>
              {queueData.length}
            </Typography>
          </div>
          <div className={classes.queueTabStat}>
            <TimelapseIcon className={classes.queueTabIcon} />
            <Typography className={classes.queueTabStatValue}>
              {queueData.waitTime}
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
  queueData: PropTypes.object,
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

function AllQueues() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <QueueTab
          className={classes.queueTab}
          queueData={caseManagementQueueData}
        />
        <QueueTab
          className={classes.queueTab}
          queueData={legalServicesQueueData}
        />
        <QueueTab className={classes.queueTab} queueData={stepQueueData} />
      </Tabs>
      {value === 0 && <QueueTable queueData={caseManagementQueueData} />}
      {value === 1 && <QueueTable queueData={legalServicesQueueData} />}
      {value === 2 && <QueueTable queueData={stepQueueData} />}
    </div>
  )
}

AllQueues.propTypes = {
  queueData: PropTypes.array,
  classes: PropTypes.object,
}

export default AllQueues
