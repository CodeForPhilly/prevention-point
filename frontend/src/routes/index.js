import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
// import PrivateRoute from "../routes/PrivateRoute"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import MainLayout from "../layouts/MainLayout"
import ParticipantsList from "../components/ParticipantsList"
import AllQueues from "../components/AllQueues"

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/login" component={LoginForm} />
      <MainLayout>
        <Switch>
          <Route exact path="/" component={AllQueues} />
          <Route exact path="/participants" component={ParticipantsList} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  )
}

export default Routes
