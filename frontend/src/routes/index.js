import React from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"
import ServicesQueues from "./ServicesQueues"

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <PrivateRoute exact path="/" component={ServicesQueues} />
      <Route path="/login" component={LoginForm} />
    </Router>
  )
}

export default Routes
