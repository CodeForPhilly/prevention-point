import React from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import ParticipantSearch from "../components/ParticipantSearch"
import AlbumSearch from "../components/AlbumSearch"
import { Route } from "react-router-dom"
import PrivateRoute from "../routes/PrivateRoute"

const Routes = () => {
  return (
    <div>
      <Navbar />
      <PrivateRoute exact path="/" component={ParticipantSearch} />
      <Route path="/login" component={LoginForm} />
      <Route path="/album" component={AlbumSearch} />
    </div>
  )
}

export default Routes
