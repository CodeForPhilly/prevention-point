import React from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import MainContent from "../components/MainContent"
import { Route } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"

const Routes = () => {
  return (
    <div>
      <Navbar />
      <PrivateRoute exact path="/" component={MainContent} />
      <Route path="/login" component={LoginForm} />
    </div>
  )
}

export default Routes
