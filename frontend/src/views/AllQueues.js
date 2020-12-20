import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { makeStyles } from "@material-ui/styles"
import { Tabs } from "@material-ui/core"
import QueueTab from "../components/QueueComponent/QueueTab/QueueTab"
import AppBar from "@material-ui/core/AppBar"
import { RootStoreContext } from "../stores/RootStore"
import QueueTable from "../components/QueueComponent/QueueTable/QueueTable"
import api from "../api"
import PrevPointButton from "../components/PrevPointButton"

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
  const rootStore = useContext(RootStoreContext)
  const queueStore = rootStore.QueueStore
  const classes = useStyles()
  const [queuesLoaded, setQueuesLoaded] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [btnState, setBtnState] = useState({ disabled: false, isFrozen: false })

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
    api
      .getPrograms()
      .then(({ data }) => {
        data.sort((a, b) => a.id - b.id)
        queueStore.setQueues(data)
        return Promise.all(data.map(item => queueStore.getQueue(item.id)))
      })
      .then(() => setQueuesLoaded(true))
  }, [queueStore])

  useEffect(() => {
    if (queueStore.queues.length && queueStore.queues[tabValue]) {
      api.getProgram(queueStore.queues[tabValue].id).then(({ data }) => {
        setBtnState(prev => ({ ...prev, isFrozen: data.is_frozen }))
      })
    }
  }, [tabValue, queueStore.queues])

  return (
    <div className={classes.root}>
      {queuesLoaded && (
        <>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={(event, value) => setTabValue(value)}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="Queue selector tabs"
            >
              {queueStore.queues.map(item => (
                <QueueTab
                  className={classes.queueTab}
                  key={item.name}
                  {...item}
                />
              ))}
            </Tabs>
          </AppBar>
          <QueueTable name={queueStore.queues[tabValue]} queueData={tabValue} />
          <div className={classes.freezeQueueContainer}>
            <PrevPointButton
              color="secondary"
              onClick={toggleFreeze}
              disabled={btnState.disabled}
            >
              {btnState.isFrozen ? "Unfreeze" : "Freeze"}
            </PrevPointButton>
          </div>
        </>
      )}
    </div>
  )
})

export default AllQueues
