import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import Navbar from "../components/Navbar"
import LoginForm from "../views/LoginForm"
import ParticipantSearchDrawer from "../views/ParticipantSearchDrawer/ParticipantSearchDrawer"
import ParticipantList from "../views/ParticipantList"
import AllQueues from "../views/AllQueues"
import ParticipantInfo from "../components/ParticipantInfo"

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/login" component={LoginForm} />
      <ParticipantSearchDrawer>
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
        </Switch>
      </ParticipantSearchDrawer>
    </BrowserRouter>
  )
}

export default Routes
