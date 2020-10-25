/* eslint-disable no-console */
/*
// it might be easier to maintain state integrity if we put the participant id in the route
// '/existingParticipant/:participantId/*'

we will have to differentiate
navigating a single visit's medical visitData,
and editing the top level visit info.
this route path could reflect that
(or have different path for whether the visit is new or not)
also, clear the visit data on 'componentDidUnmount'
*/
import React, { useContext, useEffect } from "react"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { Route, Switch, useHistory } from "react-router-dom"
import VisitForm from "./VisitForm"
import VisitData from "./VisitData"
import VisitTable from "./VisitTable"
import WithSubmit from "../WithSubmit"
import { rootStoreContext } from "../../stores/RootStore"
import { validateVisitForm } from "../../validation/index"

const VisitRouter = observer(() => {
  const history = useHistory()

  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const existingVisit = toJS(participantStore.visit)
  const programList = toJS(participantStore.programs)
  const serviceList = toJS(participantStore.services)

  useEffect(() => {
    // kick off api call for program list from Mobx
    participantStore.getPrograms()
    // populate the global visit object if empty (for new visits)
    if (!Object.keys(participantStore.visit).length) {
      participantStore.setDefaultVisit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitVisit = () => {
    // TODO: logic protecting against concurrent queue entries
    // if existing visit we are coming from QueueTable, so update visit
    if (existingVisit.id) {
      let valid = validateVisitForm(existingVisit)
      console.log(valid)
      // If not error:
      participantStore.updateVisit()
      // If error update state:
    } else {
      participantStore.createVisit()
    }
    // after all api calls for submit have been completed route to QueueTable
    autorun(() => {
      if (participantStore.routeToQueueTable) {
        history.push("/")
      }
    })
  }

  return (
    <Switch>
      <Route exact path="/existingParticipant">
        {Object.keys(participantStore.visit).length ? (
          <WithSubmit
            component={VisitForm}
            handleSubmit={handleSubmitVisit}
            submitText={existingVisit.id ? "Update Visit" : "Create Visit"}
            visitInfo={existingVisit}
            programList={programList}
            serviceList={serviceList}
            handleVisitChange={eventTarget =>
              participantStore.handleVisitChange(eventTarget)
            }
          />
        ) : null}
      </Route>
      <Route exact path="/existingParticipant/visits" component={VisitTable} />
      <Route
        exact
        path="/existingParticipant/visitData"
        component={VisitData}
      />
    </Switch>
  )
})

export default VisitRouter
