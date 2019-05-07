import React from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import ParticipantSearch from "../components/ParticipantSearch"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <PrivateRoute exact path="/" component={ParticipantSearch} />
      <Route path="/login" component={LoginForm} />
    </Router>
  )
}

export default Routes
