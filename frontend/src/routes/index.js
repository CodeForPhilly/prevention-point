import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import MainLayout from "../layouts/MainLayout"
import ParticipantsList from "../components/ParticipantsList"
import AllQueues from "../components/QueueComponent/AllQueues"
import ParticipantInfo from "../components/ParticipantInfo"

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/login" component={LoginForm} />
      <MainLayout>
        <Switch>
          <PrivateRoute exact path="/" component={AllQueues} />
          <PrivateRoute
            exact
            path="/participants"
            component={ParticipantsList}
          />
          <PrivateRoute
            exact
            path="/participantInfo"
            component={ParticipantInfo}
          />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  )
}

export default Routes
