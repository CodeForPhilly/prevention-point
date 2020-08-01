import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import LoginForm from "../views/LoginForm"
import MainLayout from "../layouts/MainLayout"
import ParticipantList from "../views/ParticipantList"
import AllQueues from "../views/AllQueues"
import ParticipantInfo from "../components/ParticipantInfo"
import NewParticipantView from "../views/NewParticipantView"

const Routes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route>
            <Switch>
              <PrivateRoute exact path="/" component={AllQueues} />
              <PrivateRoute
                exact
                path="/participants"
                component={ParticipantList}
              />
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
          </Route>
        </Switch>
      </MainLayout>
    </BrowserRouter>
  )
}

export default Routes
