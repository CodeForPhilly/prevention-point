import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import PublicRoute from "../routes/PublicRoute"
import LoginForm from "../views/LoginForm"
import ParticipantList from "../views/ParticipantList"
import AllQueues from "../views/AllQueues"
import ExistingParticipantView from "../views/ExistingParticipantView"
import NewParticipantView from "../views/NewParticipantView"
import Error404 from "../views/Error404Page"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login" component={LoginForm} />
        <PrivateRoute exact path="/" component={AllQueues} />
        <PrivateRoute exact path="/participants" component={ParticipantList} />
        <PrivateRoute
          path="/participants/:participantId"
          component={ExistingParticipantView}
        />
        <PrivateRoute
          exact
          path="/newParticipant"
          component={NewParticipantView}
        />
        <PublicRoute path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
