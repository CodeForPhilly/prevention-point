import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import PublicRoute from "../routes/PublicRoute"
import LoginForm from "../views/LoginForm"
import ParticipantList from "../views/ParticipantList"
import AllQueues from "../views/AllQueues"
import ParticipantInfo from "../components/ParticipantInfo"
import NewParticipantView from "../views/NewParticipantView"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login" component={LoginForm} />
        <PrivateRoute exact path="/" component={AllQueues} />
        <PrivateRoute exact path="/participants" component={ParticipantList} />
        <PrivateRoute
          exact
          path="/participantInfo"
          component={ParticipantInfo}
        />
        <PrivateRoute
          exact
          path="/newParticipant"
          component={NewParticipantView}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
