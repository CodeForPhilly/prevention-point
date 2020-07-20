// it might be easier to maintain state integrity if we put the participant id in the route
// '/existingParticipant/:participantId/*'

import React, { useContext, useEffect } from "react"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { Link, Route, Switch, useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import VisitForm from "./VisitForm"
import WithSubmit from "../WithSubmit"
import { PrevPointCopy } from "../Typography"
import PrevPointButton from "../PrevPointButton"
import { rootStoreContext } from "../../stores/RootStore"

const useStyles = makeStyles(() => ({
  TempRoute: {
    paddingTop: "75px",
    paddingBottom: "75px",
  },
}))

const VisitRouter = observer(() => {
  const classes = useStyles()
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
      participantStore.updateVisit()
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

  // set service listings based on chosen program
  const handleSetVisitProgram = value => {
    const serviceListing = programList.find(program => program.id === value)
    participantStore.setServiceList(serviceListing.services)
    participantStore.setVisitProgram(value)
    participantStore.setVisitService("")
  }

  return (
    <Switch>
      <Route exact path="/existingParticipant">
        {/*
          we will have to differentiate
          navigating a single visit's medical visitData,
          and editing the top level visit info.
          this route path could reflect that
          (or have different path for whether the visit is new or not)
          also, clear the visit data on 'componentDidUnmount'
        */}
        {Object.keys(participantStore.visit).length ? (
          <WithSubmit
            component={VisitForm}
            handleSubmit={handleSubmitVisit}
            submitText={existingVisit.id ? "Update Visit" : "Create Visit"}
            visitInfo={existingVisit}
            programList={programList}
            serviceList={serviceList}
            setVisitProgram={value => handleSetVisitProgram(value)}
            setVisitService={value => participantStore.setVisitService(value)}
            setVisitUrgency={value => participantStore.setVisitUrgency(value)}
            setVisitNotes={value => participantStore.setVisitNotes(value)}
          />
        ) : null}
      </Route>
      <Route exact path="/existingParticipant/visits">
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} className={classes.TempRoute}>
              {/*
               a table that shows a row with each visit on it goes here
                it will only show the db visit table info ,
                 (SELECT * FROM VISITS WHERE partipant_id = id;)
                the route being
                'api/participants/:participant_id/visits/'
              */}
              <PrevPointCopy>
                A table listing all the visits for a participant
              </PrevPointCopy>
              <PrevPointButton
                component={Link}
                to="/existingParticipant/visitData"
              >
                See a visit
              </PrevPointButton>
            </Grid>
          </Grid>
        </Container>
      </Route>
      <Route exact path="/existingParticipant/visitData">
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} className={classes.TempRoute}>
              <PrevPointCopy>
                secret visit data and/or a form would go here
                {/*
                  This will be a single visit display route.
                  here you can see all the data from the visit and
                  fill out forms. this will have user based permissions on
                  the backend ( for third party health providers )

                  the api route would be
                  'api/visit/:visit_id/populated/'

                  the front end route may also benefit from id based path

                  thus being '/existingParticipant/:participant_id/visits/:visit_id/'

                */}
              </PrevPointCopy>
            </Grid>
          </Grid>
        </Container>
      </Route>
    </Switch>
  )
})

export default VisitRouter
