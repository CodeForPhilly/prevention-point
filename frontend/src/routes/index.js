import React from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import ParticipantQueue from "../containers/ParticipantQueue"

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <PrivateRoute exact path="/" component={ParticipantQueue} />
      <Route path="/login" component={LoginForm} />
    </Router>
  )
}

export default Routes
