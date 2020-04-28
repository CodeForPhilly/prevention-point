import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Tabs, Button } from "@material-ui/core"
import QueueTab from "./QueueTab/QueueTab"
import AppBar from "@material-ui/core/AppBar"
import { QueueStoreContext } from "../../stores/QueueStore"
import QueueTable from "./QueueTable/QueueTable"
import api from "../../api"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  queueTab: {
    flexGrow: 1,
  },
  freezeQueueContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "8px",
  },
}))

const AllQueues = observer(() => {
  const queueStore = useContext(QueueStoreContext)
  const queueSize = Object.keys(queueStore.queues).length
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0)
  const [btnState, setBtnState] = useState({ disabled: false, isFrozen: false })
  function handleChange(event, newValue) {
    setTabValue(newValue)
  }

  const getProgram = async () => {
    let { data } = await api.getProgram(tabValue + 1)
    setBtnState({ ...btnState, isFrozen: data.is_frozen })
  }

  const toggleFreeze = async () => {
    setBtnState({ ...btnState, disabled: true })
    try {
      let response = await api.patchProgram(tabValue + 1, {
        is_frozen: !btnState.isFrozen,
      })
      if (response.ok) {
        setBtnState({ disabled: false, isFrozen: !btnState.isFrozen })
      } else {
        setBtnState({ ...btnState, disabled: false })
      }
    } catch {
      setBtnState({ ...btnState, disabled: false })
    }
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

      <div className={classes.freezeQueueContainer}>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleFreeze}
          disabled={btnState.disabled}
        >
          {btnState.isFrozen ? "Unfreeze" : "Freeze"}
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
