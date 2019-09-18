import React from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import ParticipantInfo from "../components/ParticipantInfo"
// import ParticipantSearch from "../components/ParticipantSearch"
import Participant from "../components/Participants"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import ServicesQueues from "./ServicesQueues"

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <PrivateRoute exact path="/participants" component={Participant} />
      <PrivateRoute exact path="/" component={ServicesQueues} />
      <Route path="/login" component={LoginForm} />
      <Route path="/main" component={ParticipantInfo} />
    </Router>
  )
}

export default Routes
