import React from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import Participant from "../components/Participants"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import ServicesQueues from "./ServicesQueues"
import PerDrawer from "../components/PerDrawer"

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <PrivateRoute exact path="/participants" component={Participant} />
      <PrivateRoute exact path="/" component={ServicesQueues} />
      <PrivateRoute exact path="/perdrawer" component={PerDrawer} />
      <Route path="/login" component={LoginForm} />
    </Router>
  )
}

export default Routes
