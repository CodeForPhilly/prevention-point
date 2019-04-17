import React, { useState } from "react"
import PreventionPointLogo from "../../public/img/logo.svg"
import {
  AppBar,
  Badge,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { withRouter } from "react-router-dom"
import fakeAuth from "../auth"

import "../scss/navbar.scss"

const NavHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const AccountMenu = withRouter(({ history }) => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {fakeAuth.isAuthenticated ? (
        <div>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              fakeAuth.signout(() => history.push("/"))
            }}
          >
            Sign out
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
        </div>
      )}
    </Menu>
  ))

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  return (
    <AppBar className="navbar" title="Prevention Point" position="static">
      <Toolbar className="navbar__toolbar">
        <img
          src={PreventionPointLogo}
          alt="Prevention Point Logo"
          className={"navbar__logo"}
          width="150"
        />
        <Typography className="navbar__welcome" variant="h6" color="inherit">
          <div>
            Welcome to <span className="navbar__gs">General Services</span>
          </div>
        </Typography>
        <div className="navbar__icons">
          <IconButton color="inherit" className="navbar__notif">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isMenuOpen ? "material-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  )
}

export default NavHeader
