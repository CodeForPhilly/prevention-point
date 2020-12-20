/*
future:
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
import { handleSnackbarError } from "../../error"
import VisitForm from "./VisitForm"
import VisitData from "./VisitData"
import VisitTable from "./VisitTable"
import WithSubmit from "../WithSubmit"
import { validateForm, VISIT_SCHEMA } from "../../validation/index"
import { SNACKBAR_SEVERITY } from "../../constants"
import { RootStoreContext } from "../../stores/RootStore"

const VisitRouter = observer(({ participantId }) => {
  const history = useHistory()

  const rootStore = useContext(RootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const utilityStore = rootStore.UtilityStore
  const existingVisit = toJS(participantStore.visit)
  const programList = toJS(participantStore.programs)
  const serviceList = toJS(participantStore.services)
  const fullName = `${participantStore.participant.first_name} ${participantStore.participant.last_name}`

  useEffect(() => {
    // kick off api call for program list from Mobx
    participantStore.getPrograms()
    // populate the global visit object if empty (for new visits)
    if (!participantStore.visit.id) {
      participantStore.setDefaultVisit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getParticipantVisits = async () => {
    // the route and the participant in store are validated in this component's parent, ExistingParticipantView
    // thus there should be no need to pass any other id than the current participant in the store
    await participantStore.getParticipantVisits(participantStore.participant.id)
  }

  const getProtectedVisitData = async (visitId /* slug */) => {
    // right now we really only have one type of Protected Data, SEP.
    // in the future, program or service table entries can have a slug field, and that can be used in an api route back to whatever *_data we want to get data for
    try {
      // TODO
      // send request to sepdata endpoint, with visitID as query parameter
      // request endpoint should abort the request if there is no visit id query parameter, as we DO NOT want a list of all sep datas

      //const ok = await participantStore.getVisitData(visitID, /* slug */)
      const ok = false
      if (!ok) {
        throw new Error("temp error")
        // return
      }

      history.push(`/participants/${participantId}/visits/${visitId}`)
    } catch (e) {
      // temp
      utilityStore.setSnackbarState(
        "SEP data by id not implemented yet, and you might not have permission anyway",
        {
          severity: SNACKBAR_SEVERITY.ERROR,
        }
      )
    }
  }

  const handleSubmitVisit = async () => {
    try {
      let validationErrors = await validateForm(existingVisit, VISIT_SCHEMA)
      if (validationErrors.length) {
        return validationErrors.map(error =>
          utilityStore.setSnackbarState(
            `Theres an error in the ${error.name} field.`,
            {
              severity: SNACKBAR_SEVERITY.ERROR,
            }
          )
        )
      }
      if (existingVisit.id) {
        participantStore.updateVisit()
      } else {
        participantStore.createVisit()
      }
    } catch (err) {
      const snackbarError = handleSnackbarError(err)
      utilityStore.setSnackbarState(snackbarError.message, {
        severity: snackbarError.severity,
      })
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
      <Route exact path="/participants/:participantId">
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
      <Route exact path="/participants/:participantId/visits">
        <VisitTable
          fullName={fullName}
          getParticipantVisits={() => getParticipantVisits()}
          participantVisits={participantStore.visitList}
          getProtectedVisitData={id => getProtectedVisitData(id)}
        />
      </Route>
      <Route
        exact
        path="/participants/:participantId/visits/:visitId"
        component={VisitData}
      />
    </Switch>
  )
})

export default VisitRouter
