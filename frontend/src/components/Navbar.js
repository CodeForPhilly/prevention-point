import React from "react"
import PreventionPointLogo from "../../public/img/logo.svg"
import { AppBar, Toolbar, Button } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import fakeAuth from "../auth"

const SignOut = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated && (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          fakeAuth.signout(() => history.push("/"))
        }}
      >
        Sign out
      </Button>
    )
)

const NavHeader = () => {
  return (
    <AppBar className="navbar" title="Prevention Point" position="static">
      <Toolbar>
        <img
          src={PreventionPointLogo}
          alt="Prevention Point Logo"
          width="150"
        />
        <SignOut />
      </Toolbar>
    </AppBar>
  )
}

export default NavHeader
