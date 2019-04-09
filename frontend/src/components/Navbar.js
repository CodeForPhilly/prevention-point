import React from "react"
import PreventionPointLogo from "../../public/img/logo.svg"
import { AppBar, Tabs, Tab, Toolbar } from "@material-ui/core"

const NavHeader = () => {
  return (
    <AppBar className="navbar" title="Prevention Point" position="static">
      <Toolbar>
        <img
          src={PreventionPointLogo}
          alt="Prevention Point Logo"
          width="150"
        />
        <Tabs>
          <Tab label="Item 1" />
          <Tab label="Item 2" />
          <Tab label="Item 3" />
          <Tab label="Item 4" />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}

export default NavHeader
